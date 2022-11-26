import { IProductType } from "../../product-types/types/productTypes.type";

export interface IBrand {
    id: number,
    name: string,
    code: string,
    productType: IProductType
}

export interface IBrandWithProductType {
    id: number,
    name: string,
    code: string,
    productTypeName: string
}