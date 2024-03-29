import { IProduct } from "../../../../types/product.types";
import { IGrade } from "../../grades/types/grade.type";

export interface IBeer {
    id: number,
    productId: number,
    compound: string,
    fortress: number,
    ibu: number,
    volume: number,
    forBottling: boolean,
    filtered: boolean,
    grades: IGrade[],
    product: IProduct
}


export interface IBeerListPaginate {
    count: number,
    nextPage: number,
    rows: IBeer[]
}