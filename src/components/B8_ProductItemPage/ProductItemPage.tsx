import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import style from "./ProductItemPage.module.scss";
import {FormikHelpers} from "formik";
import {ProductUpdateType} from "../../types/product.types";
import {ProductForm} from "../X_Common/ProductForm/ProductForm";
import EditIcon from '@mui/icons-material/Edit';
import {ErrorBlock} from "../X_Common/Error/ErrorBlock";
import LinearProgress from "@mui/material/LinearProgress";
import {useStore} from "../../hooks/useStore";
import {AxiosError} from "axios";
import {observer} from "mobx-react-lite";

export const ProductItemPage = observer(() => {
    const { id } = useParams<{ id: string }>();

    const {
        productStore: {
            loading,
            error,
            product,
            getProduct,
            updateProduct,
        }
    } = useStore();

    useEffect(() => {
       if (id) {
           getProduct(id).then()
       }
    }, [id])

    const onUpdateHandler = async (
        values: ProductUpdateType,
        formikHelpers: FormikHelpers<ProductUpdateType>
    ) => {
        try {
            await updateProduct({updateProduct: values, id: id as string});
        } catch (e: any) {
            process.env.NODE_ENV === 'development' &&  console.log(e);
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    return (
        <div className={style.productItemPage}>

            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        {
                            loading &&
                            <LinearProgress className={style.linearProgressWrapper}/>
                        }

                        {
                            product && (
                                <>
                                    <div className={style.titleWrapper}>
                                        <Link className={style.link}
                                              to="/products"
                                        >
                                            {"Products / "}
                                        </Link>
                                        <h1 className={style.title}>
                                            {product.name}
                                        </h1>
                                    </div>

                                    <div className={style.properties}>
                                        <div className={style.row}>
                                            <p>Size</p>
                                            <p>{product.size}</p>
                                        </div>
                                        <div className={style.row}>
                                            <p>Weight</p>
                                            <p>{product.weight}</p>
                                        </div>
                                        <div className={style.row}>
                                            <p>Description</p>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>

                                    <ProductForm buttonLabel="Edit product"
                                                 initialValues={{
                                                     name: product.name,
                                                     size: product.size,
                                                     weight: product.weight,
                                                     description: product.description,
                                                 }}
                                                 onSubmitHandler={onUpdateHandler}
                                                 topButtonIcon={<EditIcon/>}
                                                 className={style.form}
                                    />
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    )
})