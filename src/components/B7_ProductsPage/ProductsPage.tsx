import React, {useEffect} from "react";
import style from "./ProductsPage.module.scss"
import {Link} from "react-router-dom";
import {FormikHelpers} from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {ProductUpdateType} from "../../types/product.types";
import {ProductForm} from "../X_Common/ProductForm/ProductForm";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from '@mui/icons-material/Add';
import {ErrorBlock} from "../X_Common/Error/ErrorBlock";
import {useStore} from "../../hooks/useStore";
import {AxiosError} from "axios";
import {observer} from "mobx-react-lite";

export const ProductsPage = observer(() => {
    const {
        productStore: {
            products,
            loading,
            error,
            getProducts,
            createProduct,
            deleteProduct,
        }
    } = useStore();

    useEffect(() => {
        getProducts().then();
    }, []);


    const onCreateHandler = async (
        values: ProductUpdateType,
        formikHelpers: FormikHelpers<ProductUpdateType>
    ) => {
        try {
            await createProduct(values);
        } catch (e: any) {

        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    const onDeleteHandler = async (id: string) => {
        try {
            await deleteProduct(id);
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
        }
    }

    return (
        <div className={style.productsPage}>

            {
                Boolean(error) ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        {
                            loading &&
                            <LinearProgress className={style.linearProgressWrapper}/>
                        }

                        <h1 className={style.title}>Products</h1>

                        {
                            products && (
                                <>
                                    <div className={style.items}>
                                        {
                                            products.map(product => (
                                                <div key={product.id}
                                                     className={style.item}
                                                >
                                                    <Link
                                                        className={style.link}
                                                        to={`/product/${product.id}`}
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    <IconButton className={style.deleteBtn}
                                                                onClick={() => onDeleteHandler(product.id)}
                                                                //disabled={isLoading || deleteMutation.isLoading || createMutation.isLoading}
                                                    >
                                                        <DeleteIcon sx={{color: "#FFF"}}/>
                                                    </IconButton>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <ProductForm buttonLabel="Add product"
                                                 initialValues={{
                                                     name: "",
                                                     size: 1,
                                                     weight: 1,
                                                     description: "",
                                                 }}
                                                 onSubmitHandler={onCreateHandler}
                                                 topButtonIcon={<AddIcon/>}
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