import React, {useEffect} from "react";
import style from "./EpisodeItemPage.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import {ListOfCharacters} from "../X_Common/ListOfCharacters/ListOfCharacters";
import {ErrorBlock} from "../X_Common/Error/ErrorBlock";
import {useStore} from "../../hooks/useStore";
import {AxiosError} from "axios";
import {observer} from "mobx-react-lite";

export const EpisodeItemPage = observer(() => {
    const {id} = useParams<{ id: string }>();

    const {
        episodeStore: {
            episode,
            members,
            error,
            loading,
            count,
            getInfo,
            getEpisode,
        }
    } = useStore();

    useEffect(() => {
        if (id) {
            getInfo().then();
            getEpisode(id).then();
        }
    }, [id]);

    const navigate = useNavigate();

    const onBackClickHandler = () => navigate(`/episode/${Number(id) - 1}`);
    const onForwardClickHandler = () => navigate(`/episode/${Number(id) + 1}`);

    return (
        <div className={style.episodeItemPage}>

            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        {
                            loading && <LinearProgress  className={style.linearProgressWrapper}/>
                        }

                        {
                            episode && (
                                <>

                                    <div className={style.titleBlock}>

                                        <IconButton className={style.btn}
                                                    onClick={onBackClickHandler}
                                                    disabled={!id || Number(id) === 1}
                                        >
                                            <ArrowBackIcon/>
                                        </IconButton>

                                        <div className={style.titleWrapper}>
                                            <h1 className={style.title}>
                                                <span>{episode.episode}</span><span> - </span><span>{episode.name}</span>
                                            </h1>
                                            <p className={style.air}>{`Air date: ${episode.air_date}`}</p>
                                        </div>

                                        <IconButton className={style.btn}
                                                    onClick={onForwardClickHandler}
                                                    disabled={!id || !count || Boolean(id && count && (Number(id) === count))}

                                        >
                                            <ArrowForwardIcon/>
                                        </IconButton>
                                    </div>
                                </>
                            )
                        }

                        {
                            members && (
                                <ListOfCharacters title="List of characters who have been seen in the episode:"
                                                  characters={members}
                                                  className={style.residents}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
})