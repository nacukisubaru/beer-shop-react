export interface IProduct {
    id: number,
    title: string,
    description: string,
    price: number,
    quantity: number,
    brandId: number,
    inStock: boolean,
    isActive: boolean,
    image: string,
    brandName: string,
    typePackagingName: string
}

export interface IProductItem {
    id: number,
    title: string,
    description: string,
    price: number,
    image: string
}

export interface IProductBasket {
    id: number,
    title: string,
    price: number,
    description:string,
    quantity: number,
    image: string,
    inStock: boolean,
}