import { iTunesSearchResult, searchiTunesPodcasts } from "../integrations/itunes";
import { Database } from '../database/schemas/full_db'
import { Kysely, sql } from "kysely";
import { ReadPodcastResponse } from "../types/podcasts";
import { Podcast } from "../database/schemas/podcasts";


export function serializePodcasts(podcasts: Podcast[]) {
    /**
     * Utility to format podcasts to the intended DTO format
     */

    return podcasts.map(podcast => {
        return {
            collectionId: podcast.iTunesCollectionId,
            trackId: podcast.iTunesTrackId,
            artistName: podcast.artistName,
            trackName: podcast.trackName,
            collectionName: podcast.collectionName,
            artworkUrl100: podcast.artworkUrl100,
            artworkUrl60: podcast.artworkUrl60,
            artworkUrl30: podcast.artworkUrl30
        }
    })
}

export async function searchPodcasts(db: Kysely<Database>, term: string, limit: number, page: number): Promise<{results: ReadPodcastResponse[], is_cached: boolean}> {
    /**
     * Function that uses the iTunes API to search for podcasts in the following cases:
     * 
     * 1. there does not exist a podcast with the exact given term in the database searched in the last hour
     * 2. the iTunes search API is up (200 status code)
     * 
     * If any of the conditions are not met, we use pg fuzzy search to find the closest match in the database and return results from history with lower quality.
     *
     * @param db: Kysely<Database> - the database object
     * @param term: string - the search term
     * @param limit: number - the number of results to return
     * 
     * @returns
     *  - results: the list of podcasts fetched
     *  - is_cached: boolean - whether the results are taken from the DB instead of iTunes API
     */
    try{
        
        if (term.length < 1) {
            return {
                results: serializePodcasts(await getLatestPodcasts(db, limit, page)),
                is_cached: false
            }
        }
        const response = await searchiTunesPodcasts(term, limit, page)
        if (response.status == 200) {
            // we do not want to leak the explicit names of the podcasts
            const results = response.data.results.map(podcast => ({
                ...podcast,
                trackName: podcast.trackCensoredName,
                collectionCensoredName: podcast.collectionCensoredName,
                artworkUrl60: podcast.artworkUrl600

            }))

            return {
                results: results,
                is_cached: false
            }
        }
    }
    catch (e) {
        console.error(e)
    }

    // use DB-based lookup with text search to find results as a falback
    const cachedPodcasts = await findPodcastsWithFuzzySearch(db, term, limit)

    return {
        results: serializePodcasts(cachedPodcasts),
        is_cached: true
    }
    
    
    
}

export async function getLatestPodcasts(db: Kysely<Database>, limit: number, page: number) {
    /**
     * Function that returns the latest podcasts from the database.
     *
     * @param db: Kysely<Database> - the database object
     * @param limit: number - the number of results to return
     * @param page: number - the page number
     **/

    const offset = (page - 1) * limit

    return await db
    .selectFrom('podcasts')
    .selectAll()
    .orderBy('requestCount', 'desc')
    .offset(offset)
    .limit(limit)
    .execute()
}


export async function findPodcastsWithFuzzySearch(db: Kysely<Database>, term: string, limit: number, threshold_cutoff: number = 0.3) {
    /**
     * Function that uses the full-text search algorithm to find the closest match in the database.
     *
     * @param db: Kysely<Database> - the database object
     * @param term: string - the search term
     * @param limit: number - the number of results to return
     * @param threshold_cutoff: number - the threshold for the similarity score
     **/

    return await db
    .selectFrom('podcasts')
    .selectAll()
    .where(
        eb => eb.or([
            eb(sql`to_tsvector('english', "trackName" || ' ' || "collectionName" || ' ' || "artistName")`, 
            '@@', 
            sql`to_tsquery('english', ${term})`),
            eb(sql`to_tsvector('arabic', "trackName" || ' ' || "collectionName" || ' ' || "artistName")`, 
            '@@', 
            sql`to_tsquery('arabic', ${term})`)
        ])
    )
    .execute()

}