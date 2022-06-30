import React, {FC} from "react";
import style from "./ListOfCharacters.module.scss";
import clsx from "clsx";
import {ICharacter} from "../../../types/character.types";
import {Link} from "react-router-dom";

interface IListOfCharacters {
    className?: string
    title: string
    characters: ICharacter[]
}

export const ListOfCharacters: FC<IListOfCharacters> = ({
                                                            className,
                                                            title,
                                                            characters
                                                        }) => {
    return (
        <div className={clsx(style.listOfCharacters, Boolean(className) && className)}>
            <div className={style.countBlock}>
                <p>{title}</p>
                <div>{characters.length}</div>
            </div>
            <div className={style.list}>
                {
                    characters.map(character => (
                        <Link className={style.link}
                              key={character.id}
                              to={`/character/${character.id}`}
                        >
                            <div className={style.imgWrapper}>
                                <img src={character.image} alt=""/>
                            </div>

                            <p>{character.name}</p>
                        </Link>
                    ) )
                }
            </div>

        </div>
    )
}