/**
 * 
 * adding the iTunesTrackId column to the podcasts table
 */
import { Kysely, sql } from "kysely";


export async function up(db: Kysely<any>): Promise<void> {

    await sql`--sql
    CREATE INDEX podcast_fulltext_en_search ON podcasts USING GIN (to_tsvector('english', "trackName" || ' ' || "collectionName" || ' ' || "artistName"));
    CREATE INDEX podcast_fulltext_ar_search ON podcasts USING GIN (to_tsvector('arabic', "trackName" || ' ' || "collectionName" || ' ' || "artistName"))
    `.execute(db)

}

export async function down(db: Kysely<any>): Promise<void> {

    await db.schema
    .dropIndex('podcast_fulltext_en_search')
    .execute()

    await db.schema
    .dropIndex('podcast_fulltext_ar_search')
    .execute()

}
