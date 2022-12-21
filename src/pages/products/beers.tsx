import React from "react";
import { useFilter } from "../../app/hooks/useFilter";
import { useActions } from "../../app/hooks/useActions";
import { useDispatch } from "react-redux";
import { getBeerList } from "../../app/store/services/beers/reducers/beer.slice";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { limitPage } from "../../app/http/http.request.config";
import Menu from "../../app/components/Drawer/Menu/Menu";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import Filters from "../../app/components/Products/Beers/Filters";
import { wrapper } from "../../app/store/store";
import { fetchProducts } from "../../app/store/services/products/reducers/product.slice";
import { GetServerSideProps } from "next";
import ProductsList from "../../app/components/Products/ProductsList";
import BeerModal from "../../app/components/Modals/Products/BeerModal";

export default function Beers() {
    const dispath = useDispatch();
    const { sortField, order } = useAppSelector(
        (state) => state.filterProductsReducer
    );
    const {product, productList} = useAppSelector(
        (state) => state.productReducer
    );
    const { fetchBeersByFilter } = useFilter();
    const {
        resetProductFilters,
        dropBeerList,
        closeFilterMenu,
        setSearch,
        openModalNotFoundByFilter,
        closeModalNotFoundByFilter,
    } = useActions();
    const { minPrice, maxPrice } = useAppSelector(
        (state) => state.beerReducer
    );

    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.modalNotFoundByFilter
    );

    const handleApplyFilter = () => {
        fetchBeersByFilter();
        closeFilterMenu();
    };

    const handleResetFilter = async () => {
        closeFilterMenu();
        await setSearch({ q: "" });
        await resetProductFilters();
        await dropBeerList();
        await dispath(
            getBeerList({
                path: "/beers/getListByFilter",
                params: { sortField, order, page: 0, limitPage },
            })
        );
    };

    return (
        <div className="page-container">
            <Menu
                callbackApplyFilter={handleApplyFilter}
                callbackResetFilter={handleResetFilter}
                filter={{ minPrice, maxPrice, productType: "beers" }}
                filterList={[<Filters />]}
            />
            <ProductsList productType="beers"/>
            <ResultNotFoundByFilter
                openModalNotFoundByFilter={openModalNotFoundByFilter}
                closeModalNotFoundByFilter={closeModalNotFoundByFilter}
                isOpen={isOpen}
            />
            {productList.length > 0 && !isEmptyObject(product) && <BeerModal />}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        await store.dispatch(
            fetchProducts("/beers/getListByFilter/", {
                page: 0,
                limitPage,
                isActive: "true",
                sortField: "price",
                order: "ASC"
            })
        );
     
        return {
            props: {},
        };
    });
