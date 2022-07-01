import {HashRouter} from "react-router-dom";
import React, {createContext} from "react";
import {App} from "./App";
import {RootStore, store} from "../../store/RootStore";

export const StoreContext = createContext<RootStore>({} as RootStore)

export const AppContainer = () => {
    return (
        <StoreContext.Provider value={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </StoreContext.Provider>

    )
}