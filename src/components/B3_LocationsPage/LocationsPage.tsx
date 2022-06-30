import React, {ChangeEvent, useEffect} from "react";
import style from "./LocationsPage.module.scss"
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import {AxiosError} from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorBlock} from "../X_Common/Error/ErrorBlock";
import {useStore} from "../../hooks/useStore";
import {serializeSearchParams} from "../../helpers/helpers";
import {observer} from "mobx-react-lite";

export const LocationsPage = observer(() => {
    const {
        locationStore: {
            locations,
            loading,
            error,
            getLocations,
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
        getLocations(page).then();
    }, [page]);

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={style.locationsPage}>
            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        <h1 className={style.title}>Locations</h1>

                        {
                            loading &&
                            <LinearProgress className={style.linearProgressWrapper}/>
                        }

                        {
                            locations && page && pages && (
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
                                        <div className={style.listHeader}>
                                            <p>Name</p>
                                            <p>Type</p>
                                            <p>Dimension</p>
                                        </div>

                                        {
                                            locations.map(location => (
                                                <Link className={style.item}
                                                      key={location.id}
                                                      to={`/location/${location.id}`}
                                                >
                                                    <p>{location.name}</p>
                                                    <p>{location.type}</p>
                                                    <p>{location.dimension}</p>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </>
                            )
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