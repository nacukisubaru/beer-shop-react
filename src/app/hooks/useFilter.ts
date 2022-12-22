import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getBeerList } from "../store/services/beers/reducers/beer.slice";
import { fetchProducts, getProductsList } from "../store/services/products/reducers/product.slice";
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

    fetchProducts: (page: number, sortField: string, order: string) => void;
    fetchProductsByFilter: () => void;
    fetchProductsWithSort: () => void;
    fetchProductsBySearch: () => void;
    productsSearchByName: () => void;
    resetListAndFetchProducts: () => void;
    fetchProductsBySearchWithSort: () => void;
  
}

//TO DO отрефакторить весь этот колхоз не должно быть разделения на beers и snacks пораждает еще больше функций, компоненты и слайсы тоже не делить сделать через один
export const useFilter = (productType?: string): IUseFilter => {
    const dispath = useDispatch();
    const { dropBeerList, openModalNotFoundByFilter, resetProductFilters, dropSnackList, resetBeerPage, resetSnackPage, setSearch, dropProductList, resetProductPage} = useActions();
    const params: any = useAppSelector((state) => state.filterProductsReducer);

    const fetchProducts: any = async (page: number, sortField: string, order: string) => {
        const obj = { ...params, page, limitPage };
        if (sortField && order) {
            obj.sortField = sortField;
            obj.order = order;
        }
        console.log('fetch work')
        dispath(getProductsList({ path: `/${productType}/getListByFilter/`, params: obj }));
    };

    const fetchProductsByFilter: any = async () => {
        await dropProductList();
        const result = await dispath(getProductsList({ path: `/${productType}/getListByFilter/`, params: { ...params, page: 0, limitPage } }));
        setSearch({ q: '' });
        if (result.error) {
            dispath(getProductsList({
                path: `/${productType}/getListByFilter/`, params: {
                    page: 0, limitPage, isActive: 'true',
                    sortField: 'price',
                    order: 'ASC',
                }
            }));
            openModalNotFoundByFilter();
            resetProductFilters();
        }
    };

    const resetListAndFetchProducts: any = async () => {
        await dropProductList();
        fetchProducts(0, []);
    }

    const fetchProductsWithSort: any = async (sortField: string, order: string) => {
        await resetProductPage();
        await dropProductList();
        fetchProducts(0, sortField, order);
    }

    const fetchProductsBySearch: any = (page: number) => {
        dispath(getProductsList({ path: `/${productType}/search/`, params: { q: params.q, sortField: params.sortField, order: params.order, page, limitPage } }));
    }

    const fetchProductsBySearchWithSort: any = async (sortField: string, order: string) => {
        await dropProductList();
        dispath(getProductsList({ path: `/${productType}/search/`, params: { q: params.q, sortField, order, page: 0, limitPage } }));
    }

    const productsSearchByName: any = async (q: string, sortField: string, order: string) => {
        await dropProductList();
        resetProductFilters();
        const result = await dispath(getProductsList({ path: `/${productType}/search/`, params: { q, sortField, order, page: 0, limitPage } }));
        if (result.error) {
            dispath(getProductsList({ path: `/${productType}/getListByFilter/`, params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            return false;
        }
        return true;
    }


    const fetchBeersByFilter: any = async () => {
        await dropBeerList();
        const result = await dispath(getBeerList({ path: '/beers/getListByFilter/', params: { ...params, page: 0, limitPage } }));
        setSearch({ q: '' });
        if (result.error) {
            dispath(getBeerList({
                path: '/beers/getListByFilter/', params: {
                    page: 0, limitPage, isActive: 'true',
                    sortField: 'price',
                    order: 'ASC',
                }
            }));
            openModalNotFoundByFilter();
            resetProductFilters();
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

    const resetListAndFetchBeers: any = async () => {
        await dropBeerList();
        fetchBeers(0, []);
    }
    

    const fetchBeersWithSort: any = async (sortField: string, order: string) => {
        await resetBeerPage();
        await dropBeerList();
        fetchBeers(0, sortField, order);
    }

    const fetchBeersBySearch: any = (page: number) => {
        dispath(getBeerList({ path: '/beers/search/', params: { q: params.q, sort: params.sort, page, limitPage } }));
    }

    const fetchBeersBySearchWithSort: any = async (sortField: string, order: string) => {
        await dropBeerList();
        dispath(getBeerList({ path: '/beers/search/', params: { q: params.q, sortField, order, page: 0, limitPage } }));
    }

    const beersSearchByName: any = async (q: string, sortField: string, order: string) => {
        await dropBeerList();
        resetProductFilters();
        const result = await dispath(getBeerList({ path: '/beers/search/', params: { q, sortField, order, page: 0, limitPage } }));
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
            resetProductFilters();
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
        dispath(getSnackList({ path: '/snacks/search/', params: { ...params, page, limitPage } }));
    }

    const fetchSnacksBySearchWithSort: any = async (sortField: string, order: string) => {
        await dropSnackList();
        dispath(getSnackList({ path: '/snacks/search/', params: { q: params.q, sortField, order, page: 0, limitPage } }));
    }

    const snacksSearchByName: any = async (q: string, sortField: string, order: string) => {
        await dropSnackList();
        resetProductFilters();
        const result = await dispath(getSnackList({ path: '/snacks/search/', params: { q, sortField, order, page: 0, limitPage } }));
        if (result.error) {
            dispath(getSnackList({ path: '/snacks/getListByFilter/', params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            return false;
        }
        return true;
    }

    const resetListAndFetchSnacks: any = async () => {
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
        resetListAndFetchSnacks,

        fetchProducts,
        fetchProductsByFilter,
        fetchProductsWithSort,
        fetchProductsBySearch,
        productsSearchByName,
        resetListAndFetchProducts,
        fetchProductsBySearchWithSort,
    };
}
