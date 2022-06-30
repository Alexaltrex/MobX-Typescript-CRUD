import {instanceCRUD} from "./api";
import {IProduct, ProductUpdateType} from "../types/product.types";


interface IResponseProduct<T> {
    message: string
    data: T
}

export const productsApi = {
    getAll: async (): Promise<IProduct[]> => {
        let response = await instanceCRUD.get<IProduct[]>("/");
        return response.data;
    },
    getById: async (id: string): Promise<IProduct> => {
        let response = await instanceCRUD.get<IProduct>(`/${id}`);
        return response.data;
    },
    create: async (createProduct: ProductUpdateType): Promise<string> => {
        let response = await instanceCRUD.post<string>(`/`, createProduct);
        return response.data;
    },
    update: async ({updateProduct, id}: {updateProduct: ProductUpdateType, id: string}): Promise<IResponseProduct<IProduct>> => {
        let response = await instanceCRUD.put<IResponseProduct<IProduct>>(`/${id}`, updateProduct);
        return response.data;
    },
    delete: async (id: string): Promise<string> => {
        let response = await instanceCRUD.delete<string>(`/${id}`);
        return response.data;
    },
}

