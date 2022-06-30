import {IInfo} from "../types/character.types";
import {instanceRaM} from "./api";
import {IGetLocations, ILocation} from "../types/location.types";

export const locationsApi = {
    getAll: async (page: number): Promise<IGetLocations> => {
        let response = await instanceRaM.get<IGetLocations>(`location/?page=${page}`);
        return response.data;
    },
    getById: async (id: string): Promise<ILocation> => {
        let response = await instanceRaM.get<ILocation>(`location/${id}`);
        return response.data;
    },
    getMultipleItems: async (ids: string[]): Promise<ILocation[]> => {
        const url = ids.reduce( (prev, curr) => prev + String(curr) + ",", "")
        let response = await instanceRaM.get<ILocation[]>(`location/${url}`);
        return response.data;
    },
    getInfo: async (): Promise<IInfo> => {
        let response = await instanceRaM.get<IGetLocations>("location");
        return response.data.info
    }
}