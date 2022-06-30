import {useField} from "formik";
import React from "react";
import {TextField, TextFieldProps} from "@mui/material";

type FieldTextType = {
    name: string
    className?: string
} & TextFieldProps

export const FieldNumber: React.FC<FieldTextType> = ({
                                                       name,
                                                       className,
                                                       ...props}) => {
    const [
        field,
        meta,
        helpers
    ] = useField(name);

    return (
        <TextField variant="outlined"
                   type="number"
                   inputProps={{ min: 1 }}
                   id={field.name}
                   name={field.name}
                   helperText={meta.touched && meta.error}
                   value={field.value}
                   onChange={field.onChange}
                   onBlur={field.onBlur}
                   error={meta.touched && Boolean(meta.error)}
                   className={className && className}
                   {...props}
        />
    )
};





