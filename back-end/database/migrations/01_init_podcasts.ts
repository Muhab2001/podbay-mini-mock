/**
 * 
 * first migration to initialize the podcasts table
 * that caches the responsees from the itunes search api
 */
import { Kysely, sql } from "kysely";


export async function up(db: Kysely<any>): Promise<void> {

    await db.schema
    .createTable('podcasts')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('iTunesCollectionId', 'integer', (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('artworkUrl100', 'text')
    .addColumn('artworkUrl60', 'text')
    .addColumn('artworkUrl30', 'text')
    .addColumn('artistName', 'text', (col) => col.notNull())
    .addColumn('requestCount', 'integer', (col) => col.notNull().defaultTo(1))
    .addColumn('addedAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('lastUpdatedAt', 'timestamptz', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute()

    await db.schema
    .createIndex('artist_name_idx')
    .on('podcasts')
    .column('artistName')
    .execute()

    await db.schema
    .createIndex('podcast_count_idx')
    .on('podcasts')
    .column('requestCount')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {

    await db.schema
    .dropTable('podcasts')
    .execute()

}
