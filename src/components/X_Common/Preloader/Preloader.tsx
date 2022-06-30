import style from "./Preloader.module.scss"
import {CircularProgress} from "@mui/material";

export const Preloader = () => {
    return (
        <div className={style.preloader}>
            <CircularProgress size={120} sx={{color: "#FFF"}}/>
        </div>
    )
}