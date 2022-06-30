import {IInfo} from "./character.types";

export interface IGetEpisodes {
    info: IInfo
    results: IEpisode[]
}

export interface IEpisode {
    id: number
    name: string
    air_date: string
    episode: string
    characters: Array<string>
    url: string
    created: string
}