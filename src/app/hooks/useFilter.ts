import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getBeerList } from "../store/services/beers/reducers/beer.slice";
import { getSnackList } from "../store/services/snacks/reducers/snack.slice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IUseFilter {
    fetchBeers: (page: number, sortField: string, order: string) => void;
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

//TO DO отрефакторить весь этот колхоз не должно быть разделения на beers и snacks пораждает еще больше функций, компоненты и слайсы тоже не делить сделать через один
export const useFilter = (): IUseFilter => {
    const dispath = useDispatch();
    const { dropBeerList, openModalNotFoundByFilter, resetFilters, dropSnackList, resetBeerPage, resetSnackPage, setSearch } = useActions();
    const params: any = useAppSelector((state) => state.filterProductsReducer);

    const fetchBeersByFilter: any = async () => {
        await dropBeerList();
        const result = await dispath(getBeerList({ path: '/beers/getListByFilter/', params: { ...params, page: 0, limitPage } }));
        setSearch({q:''});
        if (result.error) {
            dispath(getBeerList({ path: '/beers/getListByFilter/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            resetFilters();
        }
    };

    const fetchBeers: any = async (page: number, sortField: string, order: string) => {
        const obj = { ...params, page, limitPage };
        if (sortField && order) {
            obj.sortField = sortField;
            obj.order = order;
        }
        
        dispath(getBeerList({ path: '/beers/getListByFilter/', params: obj }));
    };

    const resetListAndFetchBeers: any = async() => {
        await dropBeerList();
        fetchBeers(0, []);
    }

    const fetchBeersWithSort: any = async (sortField: string, order: string) => {
        await resetBeerPage();
        await dropBeerList();
        fetchBeers(0, sortField, order);
    }

    const fetchBeersBySearch: any = (page: number) => {
        dispath(getBeerList({path: '/beers/search/', params: { q: params.q, sort: params.sort, page, limitPage }}));
    }

    const fetchBeersBySearchWithSort: any = async (sortField: string, order: string) => {
        await dropBeerList();
        dispath(getBeerList({path: '/beers/search/', params: { q: params.q, sortField, order, page: 0, limitPage }}));
    }

    const beersSearchByName: any = async (q: string, sortField: string, order: string) => {
        await dropBeerList();
        resetFilters();
        const result = await dispath(getBeerList({path: '/beers/search/', params: { q, sortField, order, page: 0, limitPage }}));
        if (result.error) {
            dispath(getBeerList({ path: '/beers/getListByFilter/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            return false;
        }
        return true;
    }

    const fetchSnacksByFilter: any = async () => {
        await dropSnackList();
        const result = await dispath(getSnackList({ path: '/snacks/getListByFilter/', params: { ...params, page: 0, limitPage } }));
        if (result.error) {
            dispath(getSnackList({ path: '/snacks/getListByFilter/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            resetFilters();
        }
    };

    const fetchSnacks: any = async (page: number, sortField: string, order: string) => {
        const obj = { ...params, page, limitPage };
        if (sortField && order) {
            obj.sortField = sortField;
            obj.order = order;
        }

        dispath(getSnackList({ path: '/snacks/getListByFilter/', params: obj }));
    };

    const fetchSnacksWithSort: any = async (sortField: string, order: string) => {
        await resetSnackPage();
        await dropSnackList();
        fetchSnacks(0, sortField, order);
    }

    const fetchSnacksBySearch: any = (page: number) => {
        dispath(getSnackList({path: '/snacks/search/', params: { ...params, page, limitPage }}));
    }

    const fetchSnacksBySearchWithSort: any = async (sortField: string, order: string) => {
        await dropSnackList();
        dispath(getSnackList({path: '/snacks/search/', params: { q: params.q, sortField, order, page: 0, limitPage }}));
    }

    const snacksSearchByName: any = async (q: string, sortField: string, order: string) => {
        await dropSnackList();
        resetFilters();
        const result = await dispath(getSnackList({path: '/snacks/search/', params: { q, sortField, order, page: 0, limitPage }}));
        if (result.error) {
            dispath(getSnackList({ path: '/snacks/getListByFilter/', params: { page: 0, limitPage } }));
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
