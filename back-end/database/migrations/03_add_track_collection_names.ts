/**
 * 
 * adding the iTunesTrackId column to the podcasts table
 */
import { Kysely, sql } from "kysely";


export async function up(db: Kysely<any>): Promise<void> {

    await db.schema
    .alterTable('podcasts')
    .addColumn('collectionName', 'text', col => col.notNull())
    .execute()

    await db.schema
    .alterTable('podcasts')
    .renameColumn('name', 'trackName')
    .execute()

}

export async function down(db: Kysely<any>): Promise<void> {

    await db.schema
    .alterTable('podcasts')
    .renameColumn('trackName', 'name')
    .execute()

    await db.schema
    .alterTable('podcasts')
    .renameColumn('name', 'trackName')
    .execute()

}
