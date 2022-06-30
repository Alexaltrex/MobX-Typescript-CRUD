import {IInfo} from "./character.types";

export interface IGetLocations {
    info: IInfo
    results: ILocation[]
}

export interface ILocation {
    id: number
    name: string
    type: string
    dimension: string
    residents: Array<string>
    url: string
    created: string
}