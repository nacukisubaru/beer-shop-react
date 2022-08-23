import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getBeerList } from "../store/services/beers/reducers/beer.slice";
import { getSnackList } from "../store/services/snacks/reducers/snack.slice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IUseFilter {
    fetchBeers: (page: number) => void;
    fetchBeersByFilter: () => void;
    fetchSnacks: () => void;
    fetchSnacksByFilter: () => void; 
}

const useGetParams = () => {
    const {grades, brandIds, minPrice, maxPrice, minVolumeVal, maxVolumeVal, minFortressVal, maxFortressVal} = useAppSelector((state) => state.filterProductsReducer);
    const params: any = {};

    if(grades.length > 0) {
        params.grades = grades;
    }

    if(brandIds.length > 0) {
        params.brandIds = brandIds ;
    }

    if (minPrice > 0 && maxPrice > 0) {
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
    }

    if(minVolumeVal > 0 && maxVolumeVal > 0) {
        params.minVolume = minVolumeVal;
        params.maxVolume = maxVolumeVal;
    }

    if(minFortressVal > 0 && maxFortressVal > 0) {
        params.minFortress = minFortressVal;
        params.maxFortress = maxFortressVal;
    }

    return params;
}

export const useFilter = (): IUseFilter => {
    const dispath = useDispatch();
    const { dropBeerList, openModalNotFoundByFilter, resetFilters, dropSnackList } = useActions();
    const params: any = useGetParams();
    params.page = 0;
    params.limitPage = limitPage;

    const fetchBeersByFilter: any = async () => {
        await dropBeerList();
        const result = await dispath(getBeerList({ path: '/beers/getListByFilter/', params }));
        if (result.error) {
            dispath(getBeerList({ path: '/beers/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            resetFilters();
        }
    };

    const fetchBeers: any = async (page: number) => {
        if (params !== {}) {
            dispath(getBeerList({ path: '/beers/getListByFilter/', params: { ...params, page } }));
        } else {
            dispath(getBeerList({ path:'/beers/',  params: { page, limitPage } }));
        }
    };

    const fetchSnacksByFilter: any = async () => {
        await dropSnackList();
        const result = await dispath(getSnackList({ path: '/snacks/getListByFilter/', params }));
        if (result.error) {
            dispath(getSnackList({ path: '/snacks/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            resetFilters();
        }
    };

    const fetchSnacks: any = async (page:number) => {
        if (params !== {}) {
            dispath(getSnackList({ path: '/snacks/getListByFilter/', params: { ...params, page }}));
        } else {
            dispath(getSnackList({ path:'/snacks/',  params: { page, limitPage }}));
        }
    };

    return { fetchBeersByFilter, fetchSnacks, fetchBeers, fetchSnacksByFilter };
}