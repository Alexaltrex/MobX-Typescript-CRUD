import {useContext} from "react";
import {StoreContext} from "../components/A0_App/AppContainer";
import {RootStore} from "../store/RootStore";

export const useStore = (): RootStore => useContext(StoreContext)