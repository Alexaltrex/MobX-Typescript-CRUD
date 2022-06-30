import React, {FC} from "react";
import style from "./Header.module.scss";
import {Link, useLocation} from "react-router-dom";
import clsx from "clsx";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from "@mui/material/IconButton";
import src0 from "../../assets/jpeg/menu/characters.jpg";
import src1 from "../../assets/jpeg/menu/locations.jpg";
import src2 from "../../assets/jpeg/menu/episodes.jpg";
import src3 from "../../assets/jpeg/menu/crud.jpg";
import {useStore} from "../../hooks/useStore";
import {observer} from "mobx-react-lite";
import logo from "../../assets/jpeg/logo.png"

export const links = [
    {
        label: "Characters",
        to: "/characters",
        slug: "characters",
        src: src0,
    },
    {
        label: "Locations",
        to: "/locations",
        slug: "locations",
        src: src1,
    },
    {
        label: "Episodes",
        to: "/episodes",
        slug: "episodes",
        src: src2,
    },
    {
        label: "CRUD",
        to: "/products",
        slug: "products",
        src: src3,
    },
];

interface IHeader {
    hideHeader: boolean
}

export const Header: FC<IHeader> = observer(({hideHeader}) => {
    const {appStore: {burgerMenu, setBurgerMenu}} = useStore();
    const onBurger = () => setBurgerMenu(!burgerMenu);
    const location = useLocation();

    return (
        <header className={style.header}>
            <div className={clsx({
                [style.hidable]: true,
                [style.hidable_hide]: hideHeader,
            })}
            >
                <div className={style.inner}>
                    <Link className={style.logo}
                          to={`/`}
                    >
                        <img src={logo} alt=""/>
                        <p>MobX + TypeScript + CRUD</p>
                    </Link>

                    <nav className={style.links}>
                        {
                            links.map(({label, to, slug}, index) => (
                                <Link key={index}
                                      to={to}
                                      className={clsx({
                                          [style.link]: true,
                                          [style.link_selected]: location.pathname.includes(slug),
                                      })}
                                >
                                    <span>{label}</span>
                                </Link>
                            ))
                        }
                    </nav>

                    <IconButton className={style.burger}
                                onClick={onBurger}
                    >
                        {burgerMenu ? <MenuOpenIcon/> : <MenuIcon/>}
                    </IconButton>
                </div>
            </div>

        </header>
    )
})
