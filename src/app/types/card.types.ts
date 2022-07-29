export interface ICard {
    title: string,
    description: string,
    price: number,
    img: string,
    buy: () => void
}