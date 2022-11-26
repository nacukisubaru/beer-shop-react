import { IBeer } from "../store/services/beers/types/beer.type";
import { IBrand, IBrandWithProductType } from "../store/services/brands/types/brand.types";
import { IGrade } from "../store/services/grades/types/grade.type";
import { ISnack, ISnackProduct } from "../store/services/snacks/types/snacks.types";

interface IProduct {
    id: number,
    title: string,
    description: string,
    price: number,
    quantity: number,
    brandId: number,
    inStock: string,
    isActive: string,
    image: string,
    brandName: string,
    typePackagingName: string,
    typePackagingId: number,
}

interface IBeerProduct extends IProduct {
    compound: string,
    fortress: number,
    ibu: number,
    volume: number,
    forBottling: string,
    filtered: string,
    grades: IGrade[],
}

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
                ...product,
                filtered: beer.filtered ? 'Да' : 'Нет',
                forBottling: beer.forBottling ? 'Да' : 'Нет',
                isActive: product.isActive ? 'Да' : 'Нет',
                inStock: product.inStock ? 'Да' : 'Нет'
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

export const createBrandsList = (brandList: IBrand[]): IBrandWithProductType[] => {
    if(Array.isArray(brandList) && brandList.length) {
        return brandList.map((brand) => {
            const productType = brand.productType;
            return {
                ...brand,
                productTypeName: productType.name
            };
        });
    }
    
    return [];
}

export const createList = (array:any, list: string) => {
    switch(list) {
        case 'beer':
           return createBeersList(array);
        case 'snack':
           return createSnacksList(array);
        case 'brand':
            return createBrandsList(array);
    }
    return [];
}