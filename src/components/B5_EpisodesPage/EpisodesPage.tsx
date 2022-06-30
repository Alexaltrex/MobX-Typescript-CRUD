import React, {ChangeEvent, useEffect} from "react";
import style from "./EpisodesPage.module.scss"
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import {AxiosError} from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorBlock} from "../X_Common/Error/ErrorBlock";
import {useStore} from "../../hooks/useStore";
import {serializeSearchParams} from "../../helpers/helpers";
import {observer} from "mobx-react-lite";

export const EpisodesPage = observer(() => {
    const {
        episodeStore: {
            episodes,
            loading,
            error,
            getEpisodes,
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
        getEpisodes(page).then();
    }, [page]);

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={style.episodesPage}>

            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        {loading && <LinearProgress  className={style.linearProgressWrapper}/>}

                        <h1 className={style.title}>Episodes</h1>

                        {
                            episodes && page && pages &&
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
                                <div className={style.list}>
                                    {
                                        episodes.map(episode => (
                                                <Link className={style.link}
                                                      key={episode.id}
                                                      to={`/episode/${episode.id}`}
                                                >
                                                    {`${episode.episode} - ${episode.name}`}
                                                </Link>
                                            )
                                        )
                                    }
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