import React, {ChangeEvent, useEffect} from "react";
import style from "./CharactersPage.module.scss"
import {Pagination} from "@mui/material";
import {CharacterCard} from "./CharacterCard/CharacterCard";
import {AxiosError} from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorBlock} from "../X_Common/Error/ErrorBlock";
import {observer} from "mobx-react-lite";
import {useStore} from "../../hooks/useStore";
import {useLocation, useSearchParams} from "react-router-dom";
import {serializeSearchParams} from "../../helpers/helpers";

export const CharactersPage = observer(() => {
    const {
        characterStore: {
            characters,
            loading,
            error,
            getCharacters,
            page,
            pages,
            setPage
        }
    } = useStore();

    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    // URL => STATE
    useEffect(() => {
        const page = searchParams.get('page');
        if (page) {
            setPage(Number(page));
        }
    }, []);
    // STATE => URL
    useEffect(() => {
        const nextSearchParams = {...serializeSearchParams(searchParams)};
        nextSearchParams.page = String(page);
        setSearchParams(nextSearchParams);
    }, [page, location.pathname]);

    useEffect(() => {
        getCharacters(page).then();
    }, [page]);

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={style.charactersPage}>
            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        <h1 className={style.title}>Characters</h1>

                        {
                            loading &&
                            <LinearProgress className={style.linearProgressWrapper}/>
                        }

                        {
                            characters && page && pages &&
                            <>
                                <Pagination count={pages}
                                            page={page}
                                            variant="outlined"
                                            shape="rounded"
                                            size="small"
                                            className={style.pagination}
                                            sx={paginationSx}
                                            onChange={onChangeHandler}
                                            disabled={loading}
                                />
                                <div className={style.cards}>
                                    <div className={style.inner}>
                                        {
                                            characters.map(character => (
                                                    <CharacterCard key={character.id}
                                                                   character={character}
                                                    />
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </>
                )
            }
        </div>
    )
})

//=================== STYLES ====================//
const paginationSx = {
    "& .MuiButtonBase-root": {
        backgroundColor: "#FFF",
        transition: "0.3s",
        "&:hover": {
            backgroundColor: "#CCC",
        }
    },
    "& .Mui-selected": {
        backgroundColor: "#AAA!important",
        "&:hover": {
            backgroundColor: "#AAA",
        }
    }
}