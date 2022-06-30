import React, {useEffect, useRef, useState} from 'react';
import style from "./App.module.scss";
import clsx from "clsx";
import {HomePage} from "../B0_HomePage/HomePage";
import {Header} from "../A1_Header/Header";
import {Route, Routes, useLocation} from "react-router-dom";
import {BurgerMenu} from "../A2_BurgerMenu/BurgerMenu";
import {useStore} from "../../hooks/useStore";
import {observer} from "mobx-react-lite";
import {CharactersPage} from "../B1_CharactersPage/CharactersPage";
import {CharacterItemPage} from "../B2_CharacterItemPage/CharacterItemPage";
import {LocationsPage} from "../B3_LocationsPage/LocationsPage";
import {LocationItemPage} from "../B4_LocationItemPage/LocationItemPage";
import {EpisodesPage} from "../B5_EpisodesPage/EpisodesPage";
import {EpisodeItemPage} from "../B6_EpisodeItemPage/EpisodeItemPage";
import {ProductsPage} from "../B7_ProductsPage/ProductsPage";
import {ProductItemPage} from "../B8_ProductItemPage/ProductItemPage";
import {SnackbarCustom} from "../X_Common/SnackbarCustom/SnackbarCustom";

const routes = [
    {path: "/", element: <HomePage/>},
    {path: "/characters", element: <CharactersPage/>},
    {path: "/character/:id", element: <CharacterItemPage/>},
    {path: "/locations", element: <LocationsPage/>},
    {path: "/location/:id", element: <LocationItemPage/>},
    {path: "/episodes", element: <EpisodesPage/>},
    {path: "/episode/:id", element: <EpisodeItemPage/>},
    {path: "/products", element: <ProductsPage/>},
    {path: "/product/:id", element: <ProductItemPage/>},
];

export const App = observer(() => {
    const {appStore: {burgerMenu}} = useStore();

    const {
        characterStore: {
            setPage: setPageCharacter
        },
        locationStore: {
            setPage: setPageLocation
        },
        episodeStore: {
            setPage: setPageEpisode
        },
    } = useStore();

    const location = useLocation();
    useEffect(() => {
        setPageCharacter(1);
        setPageLocation(1);
        setPageEpisode(1);
    }, [location.pathname]);

    const ref = useRef<HTMLDivElement>(null)
    const [scrollTop, setScrollTop] = useState(0);
    const [hideHeader, setHideHeader] = useState(false);

    const onScrollHandler = (e: any) => {
        if (ref && ref.current) {
            const newScrollTop = ref.current.scrollTop;
            if (newScrollTop > scrollTop) {
                setHideHeader(true);
            } else {
                setHideHeader(false);
            }
            setScrollTop(newScrollTop);
        }
    };

    return (
        <div className={clsx({
            [style.app]: true,
            [style.app_fixed]: burgerMenu
        })}
             ref={ref}
             onScroll={onScrollHandler}
        >
            <Header hideHeader={hideHeader}/>
            <BurgerMenu/>
            <SnackbarCustom/>
            <main className={style.main}>
                <Routes>
                    {
                        routes.map(({path, element}, index) => (
                            <Route key={index}
                                   path={path}
                                   element={element}
                            />
                        ))
                    }
                </Routes>
            </main>
        </div>
    );
})

