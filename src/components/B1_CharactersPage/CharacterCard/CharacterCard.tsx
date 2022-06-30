import React, {FC} from "react";
import style from "./CharacterCard.module.scss";
import {ICharacter} from "../../../types/character.types";
import {Link} from "react-router-dom";

interface ICharacterCard {
    character: ICharacter
}

export const CharacterCard: FC<ICharacterCard> = ({character}) => {
    return (
        <Link className={style.characterCard}
              to={`/character/${character.id}`}
        >
            <div className={style.imgWrapper}>
                <img src={character.image}
                     alt=""
                />
            </div>
            <p className={style.name}>{character.name}</p>
        </Link>
    )
}