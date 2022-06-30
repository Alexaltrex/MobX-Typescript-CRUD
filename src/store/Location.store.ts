import {action, makeObservable, observable} from "mobx";
import {ILocation} from "../types/location.types";
import {AxiosError} from "axios";
import {ICharacter} from "../types/character.types";
import {charactersApi} from "../api/characters.api";
import {locationsApi} from "../api/locations.api";
import {preUrlCharacter} from "../consts/consts";

export class LocationStore {
    @observable locations = [] as ILocation[]
    @observable location = null as null | ILocation
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
    setLocations(locations: ILocation[]) {
        this.locations = locations
    }

    @action
    setLocation(location: ILocation) {
        this.location = location
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
            const locationsResponse = await locationsApi.getInfo();
            this.setCount(locationsResponse.count);
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async getLocations(page: number) {
        try {
            this.setLoading(true);
            const locationsResponse = await locationsApi.getAll(page);
            this.setLocations(locationsResponse.results);
            this.setPages(locationsResponse.info.pages);
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e)
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async getLocation(id: string) {
        try {
            this.setLoading(true);
            const location = await locationsApi.getById(id);
            this.setLocation(location);
            const memberIds = location.residents.map(resident => resident.split(preUrlCharacter)[1]);
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