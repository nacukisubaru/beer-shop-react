import { IBeer, IBeerProduct } from "../store/services/beers/types/beer.type";

export const arrayUniqueByKey = (array:any, key = 'id') => {
    const map:any = Map;
    const arrayUniqueByKey = [
        ...new map(array.map((item: { [x: string]: any; }) => [item[key], item])).values()
    ];

    return arrayUniqueByKey;
}

export const createBeersList = (beersList: IBeer[]): IBeerProduct[] => {
    if(Array.isArray(beersList) && beersList.length) {
        return beersList.map((beer) => {
        const {
                product, 
                compound, 
                fortress, 
                ibu, 
                volume, 
                forBottling, filtered, grades} = beer;
            const {
                id,
                brandName, 
                title, 
                description, 
                price, 
                quantity, 
                image,
                brandId,
                inStock, isActive, typePackagingName} = product;
            return {
                id, 
                title, 
                description, 
                price, 
                quantity, 
                inStock, 
                isActive, 
                typePackagingName, 
                brandName, 
                compound, 
                fortress,
                image,
                brandId,
                ibu, volume, forBottling, filtered, grades};
        });
    }
    
    return [];
}