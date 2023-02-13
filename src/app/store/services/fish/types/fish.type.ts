import { IProduct } from "../../../../types/product.types";

export interface IFish {
    id: number,
    productId: number,
    weight: number,
    fishTypeId: number,
    fishType: IFishType
    product: IProduct
}

export interface IFishProduct extends IProduct {
    weight: number,
    fishTypeId: number,
}

export interface IFishListPaginate {
    count: number,
    nextPage: number,
    rows: IFish[]
}

export interface IFishType {
    id: number,
    name: string
}