export interface ICard {
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    inStock: boolean,
    detailUrl: string,
    buy: () => void
}