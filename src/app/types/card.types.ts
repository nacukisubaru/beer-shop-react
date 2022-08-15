export interface ICard {
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    buy: () => void
}