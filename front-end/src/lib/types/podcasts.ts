export interface ReadPodcastResponse {
    collectionId: number
    trackId: number
    artistName: string
    trackName: string
    collectionName: string
    artworkUrl100: string | null
    artworkUrl60: string | null
    artworkUrl30: string | null
}