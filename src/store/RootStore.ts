import {AppStore} from "./AppStore";
import {CharacterStore} from "./CharacterStore";
import {LocationStore} from "./Location.store";
import {EpisodeStore} from "./EpisodeStore";
import {ProductStore} from "./ProductStore";

export class RootStore {
    appStore: AppStore;
    characterStore: CharacterStore;
    locationStore: LocationStore;
    episodeStore: EpisodeStore;
    productStore: ProductStore;

    constructor() {
        this.appStore = new AppStore();
        this.characterStore = new CharacterStore();
        this.locationStore = new LocationStore();
        this.episodeStore = new EpisodeStore();
        this.productStore = new ProductStore();
    }
}
export const store = new RootStore()
