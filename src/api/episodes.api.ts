import {IInfo} from "../types/character.types";
import {instanceRaM} from "./api";
import {IEpisode, IGetEpisodes} from "../types/episodes.types";

export const episodesApi = {
    getAll: async (page: number): Promise<IGetEpisodes> => {
        let response = await instanceRaM.get<IGetEpisodes>(`episode/?page=${page}`);
        return response.data;
    },
    getById: async (id: string): Promise<IEpisode> => {
        let response = await instanceRaM.get<IEpisode>(`episode/${id}`);
        return response.data;
    },
    getMultipleItems: async (ids: string[]): Promise<IEpisode[]> => {
        const url = ids.reduce( (prev, curr) => prev + String(curr) + ",", "")
        let response = await instanceRaM.get<IEpisode[]>(`episode/${url}`);
        return response.data;
    },
    getInfo: async (): Promise<IInfo> => {
        let response = await instanceRaM.get<IGetEpisodes>("episode");
        return response.data.info
    }
}