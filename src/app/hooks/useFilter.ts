import { useDispatch } from "react-redux";
import { limitPage } from "../store/services/api.config";
import { getBeerList } from "../store/services/beers/reducers/beer.slice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IUseFilter {
    fetchBeers: (page: number) => void;
    fetchBeersByFilter: () => void;
    fetchSnacks: () => void;
}

interface IUseGetParams {
    grades: [],
    brandIds: [],
    minPrice: number,
    maxPrice: number
}

const useGetParams = ():IUseGetParams => {
    const grades = useAppSelector((state) => state.filterProductsReducer.grades);
    const brandIds = useAppSelector((state) => state.filterProductsReducer.brandIds);
    const minPrice = useAppSelector((state) => state.filterProductsReducer.minPrice);
    const maxPrice = useAppSelector((state) => state.filterProductsReducer.maxPrice);

    const params:any = {page:0, limitPage, grades, brandIds};
    if(minPrice > 0 && maxPrice > 0) {
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
    }

    return params;
}

export const useFilter = ():IUseFilter => {
    const dispath = useDispatch();
    const {dropBeerList, openModalNotFoundByFilter, resetFilters} = useActions();
    const params = useGetParams();
    const {grades, brandIds, minPrice, maxPrice} = params;

    const fetchBeersByFilter:any = async () => {
        await dropBeerList();
        const result = await dispath(getBeerList({action:'getListByFilter', params}));
        if(result.error) {
            dispath(getBeerList({params:{page: 0, limitPage}}));
            openModalNotFoundByFilter();
            resetFilters();
        }
    };

    const fetchBeers:any = async (page: number) => {
        if(grades.length > 0 || brandIds.length > 0 || (minPrice > 0 && maxPrice > 0)) {
            dispath(getBeerList({action:'getListByFilter', params:{...params, page}}));
        } else {
            dispath(getBeerList({params:{page, limitPage}}));
        }
    };

    const fetchSnacks:any = async () => {
        console.log('fetch snacks');
    };

    return {fetchBeersByFilter, fetchSnacks, fetchBeers};
}