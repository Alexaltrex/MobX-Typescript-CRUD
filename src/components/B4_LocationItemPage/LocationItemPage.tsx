import React, {useEffect} from "react";
import style from "./LocationItemPage.module.scss";
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

export const LocationItemPage = observer(() => {
    const { id } = useParams<{ id: string }>();

    const {
        locationStore: {
            location,
            members,
            error,
            loading,
            count,
            getInfo,
            getLocation,
        }
    } = useStore();

    useEffect(() => {
        if (id) {
            getInfo().then();
            getLocation(id).then();
        }
    }, [id])

    const navigate = useNavigate();

    const onBackClickHandler = () => navigate(`/location/${Number(id) - 1}`)
    const onForwardClickHandler = () => navigate(`/location/${Number(id) + 1}`)


    return (
        <div className={style.locationItemPage}>

            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        {
                            loading && <LinearProgress  className={style.linearProgressWrapper}/>

                        }

                        {
                            location && (
                                <>
                                    <div className={style.titleBlock}>

                                        <IconButton className={style.btn}
                                                    onClick={onBackClickHandler}
                                                    disabled={!id || Number(id) === 1}
                                        >
                                            <ArrowBackIcon/>
                                        </IconButton>

                                        <h1 className={style.title}>
                                            {location.name}
                                        </h1>

                                        <IconButton className={style.btn}
                                                    onClick={onForwardClickHandler}
                                                    disabled={!id || !count || Boolean(id && count && (Number(id) === count))}

                                        >
                                            <ArrowForwardIcon/>
                                        </IconButton>

                                    </div>

                                    <div className={style.infoBlock}>
                                        <div className={style.row}>
                                            <p>Dimension</p>
                                            <p>{location.dimension}</p>
                                        </div>
                                        {
                                            location.type && <div className={style.row}>
                                                <p>Type</p>
                                                <p>{location.type}</p>
                                            </div>
                                        }
                                    </div>
                                </>
                            )
                        }

                        {
                            members && (
                                <ListOfCharacters title="List of characters who have been seen in the location:"
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