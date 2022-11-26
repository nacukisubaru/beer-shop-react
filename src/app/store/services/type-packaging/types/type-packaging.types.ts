import { IProductType } from "../../product-types/types/productTypes.type";

export interface ITypePackaging {
    id: number,
    name: string,
    productType: IProductType
}