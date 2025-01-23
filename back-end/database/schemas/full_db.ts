import { PersonTable } from "./dummy";
import { PodcastsTable } from "./podcasts";

export interface Database {
    person: PersonTable
    podcasts: PodcastsTable
}