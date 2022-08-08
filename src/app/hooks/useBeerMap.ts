import { IBeer } from "../store/services/beers/types/beer.type";
import { IProductСharacteristics } from "../types/product.types";
import { useProductMap } from "./useProductMap";

export const useCreateBeerProductForBuy = (beer: IBeer): IProductСharacteristics => {
    const {id, price, title, description, image} = beer.product;
    const product: IProductСharacteristics = {
        id,
        title,
        price,
        description,
        quantity: 1,
        image,
        characteristics: {
            compound: beer.compound,
            fortress: beer.fortress,
            ibu: beer.ibu,
            volume: beer.volume,
        },
    };

    return product;
}


export const useBeerMap = (list: IBeer[]) => {
    const createBeerProductForBuy = useCreateBeerProductForBuy;
    const productMap = useProductMap(list, createBeerProductForBuy);
    return productMap;
};