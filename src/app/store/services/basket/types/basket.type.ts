import { IProduct } from "../../../../types/product.types";

export interface IBasket {
    id: number,
    userId: number,
    amount: number,
    products: IProduct[]
}