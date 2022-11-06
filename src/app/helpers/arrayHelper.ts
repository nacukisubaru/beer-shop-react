import { IBeer, IBeerProduct } from "../store/services/beers/types/beer.type";
import { ISnack, ISnackProduct } from "../store/services/snacks/types/snacks.types";

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
            const product =  beer.product;
            return {
                ...beer,
                ...product
            };
        });
    }
    
    return [];
}

export const createSnacksList = (snacksList: ISnack[]): ISnackProduct[] => {
    if(Array.isArray(snacksList) && snacksList.length) {
        return snacksList.map((snack) => {
            const product = snack.product;
            return {
                ...snack,
                ...product
            };
        });
    }
    
    return [];
}

export const createList = (array:any, list: string) => {
    switch(list) {
        case 'beer':
           return createBeersList(array);
        break;
        case 'snack':
           return createSnacksList(array);
        break;
    }
    return [];
}