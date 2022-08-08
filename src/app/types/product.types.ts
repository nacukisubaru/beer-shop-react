import { IBeer, IBeerProduct } from "../store/services/beers/types/beer.type"
import { ISnacks } from "../store/services/snacks/types/snacks.types"

export interface IProduct {
    id: number,
    title: string,
    description: string,
    price: number,
    quantity: number,
    brandId: number,
    inStock: boolean,
    isActive: boolean,
    image: string
}

export interface IProductItem {
    id: number,
    title: string,
    description: string,
    price: number,
    image: string
}

export interface IProductСharacteristics {
    id: number,
    title: string,
    price: number,
    description:string,
    quantity: number,
    image: string,
    characteristics: IBeerProduct | ISnacks
}