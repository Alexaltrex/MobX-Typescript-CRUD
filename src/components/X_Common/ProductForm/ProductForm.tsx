import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import {ProductUpdateType} from "../../../types/product.types";
import {FieldText} from "../FieldText/FieldText";
import {Button} from "@mui/material";
import React, {FC, useState} from "react";
import style from "./ProductForm.module.scss"
import clsx from "clsx";
import {FieldNumber} from "../FieldNumber/FieldNumber";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface IProductForm {
    initialValues: ProductUpdateType
    buttonLabel: string
    onSubmitHandler: (values: ProductUpdateType, formikHelpers: FormikHelpers<ProductUpdateType>) => void
    className?: string,
    topButtonIcon: JSX.Element
}

export const ProductForm: FC<IProductForm> = ({
                                                  initialValues,
                                                  buttonLabel,
                                                  onSubmitHandler,
                                                  className,
                                                  topButtonIcon
                                              }) => {
    const [showForm, setShowForm] = useState(false);

    const validate = (values: ProductUpdateType): Partial<ProductUpdateType> => {
        const error: Partial<ProductUpdateType> = {}
        if (!values.name) {
            error.name = "required"
        }
        if (!values.description) {
            error.description = "required"
        }
        return error
    }

    return (
        <div className={clsx(style.productForm, Boolean(className) && className)}>
            <Button variant="contained"
                    className={style.openBtn}
                    onClick={() => setShowForm(!showForm)}
                    startIcon={showForm ? <CloseIcon/> : topButtonIcon}
            >
                {showForm ? "close form" : buttonLabel}
            </Button>

            {
                showForm &&
                <Formik initialValues={initialValues}
                        onSubmit={onSubmitHandler}
                        validate={validate}
                        enableReinitialize
                >
                    {
                        (props: FormikProps<ProductUpdateType>) => (
                            <Form className={style.form}>
                                <FieldText name="name"
                                           label="Name"
                                           size="small"
                                           placeholder="Enter name"
                                           className={style.field}
                                />
                                <FieldNumber name="size"
                                           type="number"
                                           label="Size"
                                           size="small"
                                           placeholder="Enter size"
                                           className={style.field}
                                />
                                <FieldNumber name="weight"
                                           type="number"
                                           label="Weight"
                                           size="small"
                                           placeholder="Enter weight"
                                           className={style.field}
                                />
                                <FieldText name="description"
                                           label="Description"
                                           size="small"
                                           placeholder="Enter description"
                                           multiline={true}
                                           rows={2}
                                           className={style.field}
                                />
                                <Button type="submit"
                                        variant="contained"
                                        className={style.submit}
                                        startIcon={<SendIcon/>}
                                >
                                    {buttonLabel}
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
            }
        </div>

    )
}