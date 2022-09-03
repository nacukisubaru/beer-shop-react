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
    fetchBeersWithSort: () => void;
    fetchSnacksWithSort: () => void;
}

export const useFilter = (): IUseFilter => {
    const dispath = useDispatch();
    const { dropBeerList, openModalNotFoundByFilter, resetFilters, dropSnackList, resetBeerPage, resetSnackPage } = useActions();
    const params: any = useAppSelector((state) => state.filterProductsReducer);

    const fetchBeersByFilter: any = async () => {
        await dropBeerList();
        const result = await dispath(getBeerList({ path: '/beers/getListByFilter/', params: { ...params, page: 0, limitPage } }));
        if (result.error) {
            dispath(getBeerList({ path: '/beers/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            resetFilters();
        }
    };

    const fetchBeers: any = async (page: number, sort: string[] = []) => {
        const obj = { ...params, page, limitPage };
        if (sort.length > 0) {
            obj.sort = sort;
        }
        dispath(getBeerList({ path: '/beers/getListByFilter/', params: obj }));
    };

    const fetchBeersWithSort: any = async (sort: string[]) => {
        await resetBeerPage();
        await dropBeerList();
        fetchBeers(0, sort);
    }

    const fetchSnacksByFilter: any = async () => {
        await dropSnackList();
        const result = await dispath(getSnackList({ path: '/snacks/getListByFilter/', params: { ...params, page: 0, limitPage } }));
        if (result.error) {
            dispath(getSnackList({ path: '/snacks/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            resetFilters();
        }
    };

    const fetchSnacks: any = async (page: number, sort: string[] = []) => {
        const obj = { ...params, page, limitPage };
        if (sort.length > 0) {
            obj.sort = sort;
        }
        dispath(getSnackList({ path: '/snacks/getListByFilter/', params: obj }));
    };

    const fetchSnacksWithSort: any = async (sort: string[]) => {
        await resetSnackPage();
        await dropSnackList();
        fetchSnacks(0, sort);
    }

    return { fetchBeersByFilter, fetchSnacks, fetchBeers, fetchSnacksByFilter, fetchBeersWithSort, fetchSnacksWithSort };
}