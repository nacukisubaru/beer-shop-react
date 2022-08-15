import { IProduct } from "../../../../types/product.types";

export interface ISnack {
    id: number,
    weight: number,
    product: IProduct
}