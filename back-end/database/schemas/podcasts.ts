import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,    

} from 'kysely'


export interface PodcastsTable {

    id: Generated<number>
    iTunesCollectionId: number // the podcast collectin id coming from itunes
    name: string
    artworkUrl100: string | null;
    artworkUrl60: string | null;
    artworkUrl30: string | null;
    artistName: string
    // how many times this podcast exact name been requested
    requestCount: number
    // when was this record cached
    addedAt: ColumnType<Date, string | undefined, never>
    lastUpdatedAt: ColumnType<Date, string | undefined, never>
}

export type Podcast = Selectable<PodcastsTable>
export type NewPodcast = Insertable<PodcastsTable>
export type PodcastUpdate = Updateable<PodcastsTable>