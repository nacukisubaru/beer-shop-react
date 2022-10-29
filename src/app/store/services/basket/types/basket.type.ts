import { IProduct } from "../../../../types/product.types";

interface IBasketProduct {
    quantity: number
}

interface IBasketFieldsProduct extends IProduct {
    BasketProducts: IBasketProduct
}

export interface IBasket {
    hash: string,
    userId: number,
    amount: number,
    products: IBasketFieldsProduct[]
}

export interface IRemoveProduct {
    hash: string,
    productId: number
}

export interface IUpdateProduct {
    hash: string,
    productId: number,
    quantity:number
}

export interface getBasket {
    hash: string
}

export interface ICreateBasket {
    productId: number,
    quantity:number
}