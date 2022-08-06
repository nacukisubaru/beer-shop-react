export interface ICard {
    id: number,
    title: string,
    description: string,
    price: number,
    img: string,
    buy: () => void
}