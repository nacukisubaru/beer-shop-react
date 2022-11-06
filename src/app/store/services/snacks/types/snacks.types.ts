import { IProduct } from "../../../../types/product.types";

export interface ISnack {
    id: number,
    productId: number,
    weight: number,
    product: IProduct
}

export interface ISnackProduct extends IProduct {
    weight: number,
}