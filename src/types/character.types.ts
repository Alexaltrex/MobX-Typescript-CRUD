export interface IGetCharacters {
    info: IInfo
    results: ICharacter[]
}

export interface IGetCharactersInfinite {
    response: ICharacter[]
    nextPage: string | null
}

export interface IInfo {
    count: number
    pages: number
    prev: string | null
    next: string | null
}

export interface ICharacter {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: IOrigin
    location: IOrigin
    image: string
    episode: string[]
    url: string
    created: string
}

interface IOrigin {
    name: string
    url: string
}