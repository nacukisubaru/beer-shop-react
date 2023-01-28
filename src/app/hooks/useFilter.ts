import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getProductsList } from "../store/services/products/reducers/product.slice";
import { productType } from "../store/types/api.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IUseFilter {
    fetchProducts: (page: number, sortField: string, order: string) => void;
    fetchProductsByFilter: () => void;
    fetchProductsWithSort: () => void;
    fetchProductsBySearch: () => void;
    productsSearchByName: () => void;
    resetListAndFetchProducts: () => void;
    fetchProductsBySearchWithSort: () => void;
}

export const useFilter = (productType: productType): IUseFilter => {
    const dispath = useDispatch();
    const { openModalNotFoundByFilter, resetProductFilters, setSearch, dropProductList, resetProductPage, loaderOn, loaderOff} = useActions();
    const params: any = useAppSelector((state) => state.filterProductsReducer);

    const fetchProducts: any = async (page: number, sortField: string, order: string) => {
        const obj = { ...params, page, limitPage };
        if (sortField && order) {
            obj.sortField = sortField;
            obj.order = order;
        }
        loaderOn();
        await dispath(getProductsList({ path: `/${productType}/getListByFilter/`, params: obj }));
        loaderOff();
    };

    const fetchProductsByFilter: any = async () => {
        loaderOn();
        await dropProductList();
        const result = await dispath(getProductsList({ path: `/${productType}/getListByFilter/`, params: { ...params, page: 0, limitPage } }));
        loaderOff();
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
        loaderOn();
        await dropProductList();
        await fetchProducts(0, []);
        loaderOff();
    }

    const fetchProductsWithSort: any = async (sortField: string, order: string) => {
        loaderOn();
        await resetProductPage();
        await dropProductList();
        await fetchProducts(0, sortField, order);
        loaderOff();
    }

    const fetchProductsBySearch: any = async (page: number) => {
        loaderOn();
        await dispath(getProductsList({ path: `/${productType}/search/`, params: { q: params.q, sortField: params.sortField, order: params.order, page, limitPage } }));
        loaderOff();
    }

    const fetchProductsBySearchWithSort: any = async (sortField: string, order: string) => {
        loaderOn();
        await dropProductList();
        await dispath(getProductsList({ path: `/${productType}/search/`, params: { q: params.q, sortField, order, page: 0, limitPage } }));
        loaderOff();
    }

    const productsSearchByName: any = async (q: string, sortField: string, order: string) => {
        loaderOn();
        await dropProductList();
        resetProductFilters();
        const result = await dispath(getProductsList({ path: `/${productType}/search/`, params: { q, sortField, order, page: 0, limitPage } }));
        loaderOff();
        if (result.error) {
            dispath(getProductsList({ path: `/${productType}/getListByFilter/`, params: { page: 0, limitPage } }));
            openModalNotFoundByFilter();
            return false;
        }
        return true;
    }

    return {
        fetchProducts,
        fetchProductsByFilter,
        fetchProductsWithSort,
        fetchProductsBySearch,
        productsSearchByName,
        resetListAndFetchProducts,
        fetchProductsBySearchWithSort,
    };
}
