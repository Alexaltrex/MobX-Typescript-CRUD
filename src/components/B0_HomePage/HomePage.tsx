import React from "react";
import style from "./HomePage.module.scss"
import { links } from "../A1_Header/Header";
import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <div className={style.homePage}>
            <div className={style.links}>
                {
                    links.map(({to, label, src}, index) => (
                        <Link to={to} key={index} className={style.link}>
                            <img src={src} alt=""/>
                            <div className={style.mask}/>
                            <p>{label}</p>
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}