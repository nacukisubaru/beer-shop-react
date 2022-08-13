import { IProduct } from "../../../../types/product.types";

interface IBasketProduct {
    quantity: number
}

interface IBasketFieldsProduct extends IProduct {
    BasketProducts: IBasketProduct
}

export interface IBasket {
    id: number,
    userId: number,
    amount: number,
    products: IBasketFieldsProduct[]
}

export interface IRemoveProduct {
    id: number,
    productId: number
}