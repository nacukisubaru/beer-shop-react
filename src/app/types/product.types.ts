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
    title: string,
    description: string,
    price: number,
    image: string
}