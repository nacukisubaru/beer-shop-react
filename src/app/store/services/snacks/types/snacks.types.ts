import { IProduct } from "../../../../types/product.types";

export interface ISnack {
    id: number,
    productId: number,
    weight: number,
    product: IProduct
}