import {action, makeObservable, observable} from "mobx";
import {AxiosError} from "axios";
import {ICharacter} from "../types/character.types";
import {IEpisode} from "../types/episodes.types";
import {episodesApi} from "../api/episodes.api";
import {preUrlCharacter} from "../consts/consts";
import {charactersApi} from "../api/characters.api";

export class EpisodeStore {
    @observable episodes = [] as IEpisode[]
    @observable episode = null as null | IEpisode
    @observable loading = false;
    @observable page = 1;
    @observable pages = 1;
    @observable count = null as null | number;
    @observable error = null as null | AxiosError;
    @observable members = null as null | ICharacter[];

    constructor() {
        makeObservable(this)
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
    setEpisodes(episodes: IEpisode[]) {
        this.episodes = episodes
    }

    @action
    setEpisode(episode: IEpisode) {
        this.episode = episode
    }

    @action
    setError(error: AxiosError | null) {
        this.error = error
    }

    @action
    setMembers(members: null | ICharacter[]) {
        this.members = members
    }

    @action.bound
    async getInfo() {
        try {
            this.setLoading(true);
            const response = await episodesApi.getInfo();
            this.setCount(response.count);
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async getEpisodes(page: number) {
        try {
            this.setLoading(true);
            const response = await episodesApi.getAll(page);
            this.setEpisodes(response.results);
            this.setPages(response.info.pages);
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e)
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async getEpisode(id: string) {
        try {
            this.setLoading(true);
            const episode = await episodesApi.getById(id);
            this.setEpisode(episode);
            const memberIds = episode.characters.map(character => character.split(preUrlCharacter)[1]);
            if (memberIds.length) {
                const members = await charactersApi.getMultipleItems(memberIds);
                this.setMembers(members);
            }
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e)
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

}