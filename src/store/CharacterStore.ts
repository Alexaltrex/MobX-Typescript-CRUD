import {ICharacter} from "../types/character.types";
import {charactersApi} from "../api/characters.api";
import {action, makeObservable, observable} from "mobx";
import {AxiosError} from "axios";
import {episodesApi} from "../api/episodes.api";
import {preUrlEpisode} from "../consts/consts";
import {IEpisode} from "../types/episodes.types";

export class CharacterStore {
    @observable characters = [] as ICharacter[]
    @observable character = null as null | ICharacter
    @observable loading = false;
    @observable page = 1;
    @observable pages = 1;
    @observable count = null as null | number;
    @observable error = null as null | AxiosError;
    @observable episodes = null as null | IEpisode[]

    constructor() {
        makeObservable(this,
            //{
                // characters: observable,
                // character: observable,
                // loading: observable,
                // page: observable,
                // pages: observable,
                // count: observable,
                // error: observable,
                // episodes: observable,
                // setLoading: action,
                // setCharacters: action,
                // setCharacter: action,
                // getCharacters: action.bound,
                // getCharacter: action.bound,
                // getInfo: action.bound,
                // setPage: action.bound,
                // setPages: action,
                // setCount: action,
                // setError: action.bound,
                // setEpisodes: action
            //}
        )
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action.bound
    setPage(page: number) {
        this.page = page;
    }

    @action
    setPages(pages: number) {
        this.pages = pages;
    }

    @action
    setCount(count: number) {
        this.count = count;
    }

    @action
    setCharacters(characters: ICharacter[]) {
        this.characters = characters
    }

    @action
    setCharacter(character: ICharacter) {
        this.character = character
    }

    @action
    setError(error: AxiosError | null) {
        this.error = error
    }

    @action
    setEpisodes(episodes: null | IEpisode[]) {
        this.episodes = episodes
    }

    @action.bound
    async getInfo() {
        try {
            this.setLoading(true);
            const charactersResponse = await charactersApi.getInfo();
            this.setCount(charactersResponse.count);
        } catch (e: any) {
            console.log(e);
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async getCharacters(page: number) {
        try {
            this.setLoading(true);
            const charactersResponse = await charactersApi.getAll(page);
            this.setCharacters(charactersResponse.results);
            this.setPages(charactersResponse.info.pages);
        } catch (e: any) {
            console.log(e)
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async getCharacter(id: string) {
        try {
            this.setLoading(true);
            const characterResponse = await charactersApi.getById(id);
            this.setCharacter(characterResponse);
            const episodeIds = characterResponse.episode.map(episode => episode.split(preUrlEpisode)[1]);
            if (episodeIds.length) {
                const episodes = await episodesApi.getMultipleItems(episodeIds);
                this.setEpisodes(episodes);
            }
        } catch (e: any) {
            console.log(e)
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

}