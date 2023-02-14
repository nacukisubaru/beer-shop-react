export interface IGetListParams {
    page: number,
    sort: string,
    order: string,
    filter: string
}

export type productType = "beers" | "snacks" | "fish";