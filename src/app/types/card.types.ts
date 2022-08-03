export interface ICard {
    title: string,
    description: string,
    price: number,
    img: string,
    buy: () => void
}

export interface ICardItem extends ICard {
    id: number
}