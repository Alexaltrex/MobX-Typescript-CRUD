import React, {useEffect} from "react";
import style from "./CharacterItemPage.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";
import {Skeleton} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {observer} from "mobx-react-lite";
import {useStore} from "../../hooks/useStore";
import {IPropertyRow, PropertyRow} from "./PropertyRow/PropertyRow";
import {preUrlLocation} from "../../consts/consts";
import {ErrorBlock} from "../X_Common/Error/ErrorBlock";
import {AxiosError} from "axios";

export const CharacterItemPage = observer(() => {
    const {id} = useParams<{ id: string }>();

    const {
        characterStore: {
            character,
            episodes,
            error,
            loading,
            count,
            getInfo,
            getCharacter,
        }
    } = useStore();

    useEffect(() => {
        if (id) {
            getInfo().then();
            getCharacter(id).then();
        }
    }, [id]);

    const navigate = useNavigate();

    const onBackClickHandler = () => {
        if (id) {
            navigate(`/character/${Number(id) - 1}`)
        }
    }
    const onForwardClickHandler = () => {
        if (id) {
            navigate(`/character/${Number(id) + 1}`)
        }
    }

    return (
        <div className={style.characterItemPage}>

            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        {
                            loading && <LinearProgress className={style.linearProgressWrapper}/>
                        }

                        {
                            character ? (
                                <h1 className={style.title}>
                                    {character.name}
                                </h1>
                            ) : (
                                <Skeleton variant="rectangular" className={style.titleSkeleton}/>
                            )
                        }

                        <div className={style.imageBlock}>
                            <IconButton className={style.btn}
                                        onClick={onBackClickHandler}
                                        disabled={!id || Number(id) === 1}
                            >
                                <ArrowBackIcon/>
                            </IconButton>

                            <div className={style.imgWrapper}>
                                {character && <img src={character.image} alt=""/>}
                            </div>

                            <IconButton className={style.btn}
                                        onClick={onForwardClickHandler}
                                        disabled={!id || !count || Boolean(id && count && (Number(id) === count))}
                            >
                                <ArrowForwardIcon/>
                            </IconButton>
                        </div>

                        {
                            character &&
                            <div className={style.properties}>
                                {
                                    ([
                                        {prop: "Gender", value: character.gender},
                                        {prop: "Species", value: character.species},
                                        {prop: "Status", value: character.status},
                                        {prop: "Type", value: character.type},
                                        {
                                            prop: "Origin",
                                            value: character.origin.name,
                                            to: character.origin.url ? `/location/${character.origin.url.split(preUrlLocation)[1]}` : undefined
                                        },
                                        {
                                            prop: "Location",
                                            value: character.location.name,
                                            to: character.location.url ? `/location/${character.location.url.split(preUrlLocation)[1]}` : undefined
                                        },
                                    ] as IPropertyRow[]).map((row, index) => (
                                        <PropertyRow key={index} prop={row.prop} value={row.value} to={row?.to}/>
                                    ))
                                }
                            </div>
                        }

                        {
                            episodes &&
                            <div className={style.episodesBlock}>
                                <div className={style.countBlock}>
                                    <p>List of episodes in which this character appeared:</p>
                                    <div>{episodes.length}</div>
                                </div>
                                <div className={style.list}>
                                    {
                                        episodes.map(episode => (
                                            <Link key={episode.id}
                                                  className={style.link}
                                                  to={`/episodes/${episode.id}`}
                                            >
                                                {`${episode.episode} - ${episode.name}`}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </>
                )
            }
        </div>
    )
})