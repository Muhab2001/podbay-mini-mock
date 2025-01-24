/**
 * 
 * adding the iTunesTrackId column to the podcasts table
 */
import { Kysely, sql } from "kysely";


export async function up(db: Kysely<any>): Promise<void> {

    await db.schema
    .alterTable('podcasts')
    .addColumn('iTunesTrackId', 'integer', (col) => col.notNull())
    .execute()
    
    await db.schema
    .createIndex('itunes_track_collection_idx')
    .on('podcasts')
    .columns(['iTunesCollectionId', 'iTunesTrackId'])
    .execute()

}

export async function down(db: Kysely<any>): Promise<void> {

    await db.schema
    .alterTable('podcasts')
    .dropColumn('iTunesTrackId')
    .execute()

    await db.schema
    .dropIndex('itunes_track_collection_idx')
    .execute()

}
