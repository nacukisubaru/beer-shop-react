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
    const { openModalNotFoundByFilter, resetProductFilters, setSearch, dropProductList, resetProductPage} = useActions();
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
