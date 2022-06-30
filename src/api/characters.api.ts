import {ICharacter, IGetCharacters, IGetCharactersInfinite, IInfo} from "../types/character.types";
import {instanceRaM} from "./api";

export const charactersApi = {
    getAll: async (page: number): Promise<IGetCharacters> => {
        const response = await instanceRaM.get<IGetCharacters>(`character/?page=${page}`);
        return response.data;
    },
    getById: async (id: string): Promise<ICharacter> => {
        const response = await instanceRaM.get<ICharacter>(`character/${id}`);
        return response.data;
    },
    getMultipleItems: async (ids: string[]): Promise<ICharacter[]> => {
        const url = ids.reduce((prev, curr) => prev + String(curr) + ",", "")
        const response = await instanceRaM.get<ICharacter[]>(`character/${url}`);
        return response.data;
    },
    getInfo: async (): Promise<IInfo> => {
        const response = await instanceRaM.get<IGetCharacters>("character");
        return response.data.info
    }
}