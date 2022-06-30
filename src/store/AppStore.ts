import {action, makeObservable, observable} from "mobx";

export class AppStore {
    @observable burgerMenu: boolean = false

    constructor() {
        makeObservable(this,
            //{
            //burgerMenu: observable,
            //setBurgerMenu: action.bound,
            //}
        )
    }

    @action.bound
    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu;
    }

}