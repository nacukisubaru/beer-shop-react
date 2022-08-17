import { IProduct } from "../../../../types/product.types";
import { IGrade } from "../../grades/types/grade.type";

export interface IBeer {
    id: number,
    productId: number,
    compound: string,
    fortress: number,
    ibu: number,
    volume: number,
    grades: IGrade[],
    product: IProduct
}

export interface IBeerProduct {
    compound: string,
    fortress: number,
    ibu: number,
    volume: number
}