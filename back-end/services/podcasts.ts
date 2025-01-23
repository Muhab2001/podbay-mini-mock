import { searchiTunesPodcasts } from "../integrations/itunes";
import { Database } from '../database/schemas/full_db'
import { Kysely } from "kysely";

export async function searchPodcasts(db: Kysely<Database>, term: string, limit: number) {
    /**
     * Function that uses the iTunes API to search for podcasts in the following cases:
     * 
     * 1. there does not exist a podcast with the exact given term in the database searched in the last hour
     * 2. the iTunes search API is up (200 status code)
     * 
     * If any of the conditions are not met, we use fuzzy search to find the closest match in the database and return results from history with lower quality.
     * 
     * If the conditions are met, we save results ONLY if the iTunesId does not exist in the database. If it already exists, we increment the search count
     * to implement a basic popularity metric for the podcast front page.
     */

    const response = await searchiTunesPodcasts(term, limit)

    if (response.response.status != 200) {

        const podcasts = await findPodcastsWithFuzzySearch(db, term, limit)
    }
    else {
        const podcasts_response = response.data.results
    }
}

export async function findPodcastsWithFuzzySearch(db: Kysely<Database>, term: string, limit: number) {
    /**
     * Function that uses the fuzzy search algorithm to find the closest match in the database.
     */


}