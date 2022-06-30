import {Snackbar} from "@mui/material";
import React from "react";
import Alert from "@mui/material/Alert";
import {useStore} from "../../../hooks/useStore";
import {observer} from "mobx-react-lite";

export const SnackbarCustom = observer(() => {
    const {
        productStore: {
            snackbar: {open, message, severity},
            setSnackbar,
        }
    } = useStore();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({open: false, message, severity});
    };

    return (
        <Snackbar open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                  }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
})