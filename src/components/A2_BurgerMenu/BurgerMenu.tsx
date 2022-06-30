import React from "react";
import style from "./BurgerMenu.module.scss";
import clsx from "clsx";
import {links} from "../A1_Header/Header";
import {Link} from "react-router-dom";
import {useStore} from "../../hooks/useStore";
import {observer} from "mobx-react-lite";

export const BurgerMenu = observer(() => {
    const {appStore: {burgerMenu, setBurgerMenu}} = useStore();

    return (
        <aside className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_open]: burgerMenu,
        })}>
            <div className={style.inner}>
                {
                    links.map(({to, label}, index) => (
                        <Link to={to} key={index} className={style.link}
                              onClick={() => setBurgerMenu(false)}
                        >
                            {label}
                        </Link>
                    ))
                }
            </div>
        </aside>
    )
})