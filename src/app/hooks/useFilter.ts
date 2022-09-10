import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getBeerList } from "../store/services/beers/reducers/beer.slice";
import { getSnackList } from "../store/services/snacks/reducers/snack.slice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IUseFilter {
    fetchBeers: () => void;
    fetchBeersByFilter: () => void;
    fetchSnacks: () => void;
    fetchSnacksByFilter: () => void;
    fetchBeersWithSort: () => void;
    fetchSnacksWithSort: () => void;
    fetchBeersBySearch: () => void;
    beersSearchByName: () => void;
    resetListAndFetchBeers: () => void;
    fetchBeersBySearchWithSort: () => void;
    fetchSnacksBySearch: () => void;
    fetchSnacksBySearchWithSort: () => void;
    snacksSearchByName: () => void;
    resetListAndFetchSnacks: () => void;
}

export const useFilter = (): IUseFilter => {
    const dispath = useDispatch();
    const { dropBeerList, openModalNotFoundByFilter, resetFilters, dropSnackList, resetBeerPage, resetSnackPage, setSearch} = useActions();
    const params: any = useAppSelector((state) => state.filterProductsReducer);

    const fetchBeersByFilter: any = async () => {
        await dropBeerList();
        const result = await dispath(getBeerList({ path: '/beers/getListByFilter/', params: { ...params, page: 0, limitPage } }));
        setSearch({q:''});
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

    const resetListAndFetchBeers: any = async() => {
        await dropBeerList();
        fetchBeers(0, []);
    }

    const fetchBeersWithSort: any = async (sort: string[]) => {
        await resetBeerPage();
        await dropBeerList();
        fetchBeers(0, sort);
    }

    const fetchBeersBySearch: any = (page: number) => {
        dispath(getBeerList({path: '/beers/search/', params: { q: params.q, sort: params.sort, page, limitPage }}));
    }

    const fetchBeersBySearchWithSort: any = async (sort: string[]) => {
        await dropBeerList();
        dispath(getBeerList({path: '/beers/search/', params: { q: params.q, sort, page: 0, limitPage }}));
    }

    const beersSearchByName: any = async (q: string, sort: string[]) => {
        await dropBeerList();
        resetFilters();
        const result = await dispath(getBeerList({path: '/beers/search/', params: { q, sort, page: 0, limitPage }}));
        if (result.error) {
            dispath(getBeerList({ path: '/beers/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            return false;
        }
        return true;
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

    const fetchSnacksBySearch: any = (page: number) => {
        dispath(getSnackList({path: '/snacks/search/', params: { q: params.q, sort: params.sort, page, limitPage }}));
    }

    const fetchSnacksBySearchWithSort: any = async (sort: string[]) => {
        await dropSnackList();
        dispath(getSnackList({path: '/snacks/search/', params: { q: params.q, sort, page: 0, limitPage }}));
    }

    const snacksSearchByName: any = async (q: string, sort: string[]) => {
        await dropSnackList();
        resetFilters();
        const result = await dispath(getSnackList({path: '/snacks/search/', params: { q, sort, page: 0, limitPage }}));
        if (result.error) {
            dispath(getSnackList({ path: '/snacks/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            return false;
        }
        return true;
    }

    const resetListAndFetchSnacks: any = async() => {
        await dropSnackList();
        fetchSnacks(0, []);
    }

    return { 
        fetchBeersByFilter, 
        fetchSnacks, 
        fetchBeers, 
        fetchSnacksByFilter, 
        fetchBeersWithSort, 
        fetchSnacksWithSort, 
        fetchBeersBySearch,
        beersSearchByName,
        resetListAndFetchBeers,
        fetchBeersBySearchWithSort,
        fetchSnacksBySearch,
        fetchSnacksBySearchWithSort,
        snacksSearchByName,
        resetListAndFetchSnacks
    };
}
