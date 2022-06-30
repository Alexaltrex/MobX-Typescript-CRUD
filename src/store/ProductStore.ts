import {action, makeObservable, observable} from "mobx";
import {IProduct, ISnackbar, ProductUpdateType} from "../types/product.types";
import {AxiosError} from "axios";
import {productsApi} from "../api/products.api";

export class ProductStore {
    @observable products = [] as IProduct[];
    @observable product = null as null | IProduct;
    @observable loading = false;
    @observable error = null as null | AxiosError;
    @observable snackbar = {
        open: false,
        message: "",
        severity: "success"
    } as ISnackbar;

    constructor() {
        makeObservable(this)
    }

    @action.bound
    setSnackbar(snackbar: ISnackbar) {
        this.snackbar = snackbar;
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    setError(error: AxiosError | null) {
        this.error = error
    }

    @action
    setProducts(products: IProduct[]) {
        this.products = products
    }

    @action
    setProduct(product: IProduct) {
        this.product = product
    }

    @action.bound
    async getProducts() {
        try {
            this.setLoading(true);
            const products = await productsApi.getAll();
            this.setProducts(products);
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e)
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async getProduct(id: string) {
        try {
            this.setLoading(true);
            const product = await productsApi.getById(id);
            this.setProduct(product);
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e)
            this.setError(e)
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async createProduct(createProduct: ProductUpdateType) {
        try {
            this.setLoading(true);
            const response = await productsApi.create(createProduct);
            await this.getProducts();
            this.setSnackbar({open: true, message: response, severity: "success"})
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
            const message = e?.response?.data?.message ?? e.message;
            this.setSnackbar({open: true, message, severity: "error"});
            this.setError(e);
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async updateProduct({updateProduct, id}: {updateProduct: ProductUpdateType, id: string}) {
        try {
            this.setLoading(true);
            const response = await productsApi.update({updateProduct, id});
            await this.getProducts();
            this.setSnackbar({open: true, message: response.message, severity: "success"})
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
            const message = e?.response?.data?.message ?? e.message;
            this.setSnackbar({open: true, message, severity: "error"});
            this.setError(e);
        } finally {
            this.setLoading(false);
        }
    }

    @action.bound
    async deleteProduct(id: string) {
        try {
            this.setLoading(true);
            const response = await productsApi.delete(id);
            await this.getProducts();
            this.setSnackbar({open: true, message: response, severity: "success"})
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
            const message = e?.response?.data?.message ?? e.message;
            this.setSnackbar({open: true, message, severity: "error"});
            this.setError(e);
        } finally {
            this.setLoading(false);
        }
    }


}