export interface IBasketOrderProduct {
    id: number,
    name: string, 
    imageLink: string, 
    price: number,
    quantity: number,
    remainder: number
}

export interface IOrder {
    id: number, 
    userId: number, 
    customerName: string, 
    customerFio: string, 
    customerEmail: string,
    amount: number,
    status: string,
    products: IBasketOrderProduct[]  
}

export interface IOrderResponse {
    rows: IOrder[],
    count: number,
    nextPage: number, 
    lastPage: number
}