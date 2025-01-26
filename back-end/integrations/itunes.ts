import { Kysely, sql } from "kysely"
import { ThirdPartyHttpAPIResponse } from "../types/core"
import { ReadPodcastResponse } from "../types/podcasts"
import { Database } from "../database/schemas/full_db"
import { log } from "node:console"
import { lookup } from "node:dns"

export interface iTunesSearchResult {
    collectionId: number
    trackId: number
    artistName: string
    trackName: string
    collectionName: string
    collectionCensoredName: string
    trackCensoredName: string
    artworkUrl600: string | null
    artworkUrl100: string | null
    artworkUrl60: string | null
    artworkUrl30: string | null
}

interface iTunesSearchPayload {
    resultCount: number
    results: iTunesSearchResult[]
}

//  TODO: use a strong type to define the itunes resposne format
export async function searchiTunesPodcasts(term: string, limit: number, page: number): Promise<ThirdPartyHttpAPIResponse<iTunesSearchPayload>> {

    const offset = (page - 1) * limit

    const query_params = new URLSearchParams({
        media: 'podcast',
        term: term,
        limit: limit.toString(),
        offset: offset.toString()
    })
    const response = await fetch('https://itunes.apple.com/search?' + query_params.toString())
    const data: iTunesSearchPayload = await response.json()
    

    return {
        'status': response.status,
        'data': data
    }
}

export async function cacheiTunesPodcasts(db: Kysely<Database>, incoming_response: ReadPodcastResponse[]) {
    /**
     * Caching all the podcasts from the iTunes API response into the DB
     * to be used during rate-limiting and downtime problems of the iTunes API
     */

    
    // TODO: merge statement with temp table injected with inserted data would be more optimal
    // to update metadata of existing records instead of only cthe request count
    await db.transaction().execute(async  trx => {
        // incrment request count in the podcasts table to handle popular
    // podcast feature
    const results = await trx.
    updateTable('podcasts')
    .set({
        requestCount: (eb) => eb('requestCount', '+', 1) , 
        lastUpdatedAt: new Date().toISOString(),
    })
    .where(
        eb => eb.or(
            incoming_response.map(podcast => {
                return eb.and(
                   [ eb('iTunesTrackId', '=', podcast.trackId),
                    eb('iTunesCollectionId', '=', podcast.collectionId)
                ]
                )
            })
        )
    )
    .returning(['podcasts.iTunesTrackId', 'podcasts.iTunesCollectionId'])
    .execute()

    // insert new unseen podcasts to the DB
    const existing_podcasts = results.map(r => JSON.stringify(r))
    const missing_podcasts = []
        

    for ( let podcast of incoming_response){
        const lookup_podcast = JSON.stringify({iTunesTrackId: podcast.trackId, iTunesCollectionId: podcast.collectionId})
        if (!existing_podcasts.includes(lookup_podcast)){
            missing_podcasts.push(podcast)
        }

    }
    
    if (missing_podcasts.length !== 0){
        await trx
        .insertInto('podcasts')
        .values(missing_podcasts.map(podcast => {
            return {
                iTunesTrackId: podcast.trackId,
                iTunesCollectionId: podcast.collectionId,
                artistName: podcast.artistName,
                trackName: podcast.trackName,
                collectionName: podcast.collectionName,
                artworkUrl100: podcast.artworkUrl100,
                artworkUrl60: podcast.artworkUrl60,
                artworkUrl30: podcast.artworkUrl30,
                requestCount: 1
            }
        }))
        .execute()
    }
        })

}