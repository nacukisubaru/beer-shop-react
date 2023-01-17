import React, { useEffect } from "react";
import { useActions } from "../../app/hooks/useActions";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { limitPage } from "../../app/http/http.request.config";
import { wrapper } from "../../app/store/store";
import { fetchProducts } from "../../app/store/services/products/reducers/product.slice";
import { GetServerSideProps } from "next";
import ProductsList from "../../app/components/Products/ProductsList";
import BeerModal from "../../app/components/Modals/Products/BeerModal";
import Menu from "../../app/components/Drawer/Menu/Menu";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import Filters from "../../app/components/Products/Beers/Filters";
import { getMinAndMaxFortressBeers, getMinAndMaxVolumeBeers } from "../../app/store/services/beers/reducers/beer.slice";
import { useDispatch } from "react-redux";

export default function Beers() {   
    const {product, productList} = useAppSelector(
        (state) => state.productReducer
    );
    const {
        openModalNotFoundByFilter,
        closeModalNotFoundByFilter,
    } = useActions();
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.modalNotFoundByFilter
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMinAndMaxVolumeBeers());
        dispatch(getMinAndMaxFortressBeers());
    }, []);

    return (
        <div className="page-container">
            <Menu
                productType="beers"
                filterList={[<Filters />]}
            />
            <ProductsList 
                productType="beers" 
                showTools={true} 
                loadingByScroll={true} 
                settingsCardProps={{
                    card:{
                        width: "300px",
                        height: "390px"
                    },
                    button: {width: "279px", height: "30px"},
                    titleSize: "18px",
                    imageHeight: "200px",
                    priceSize: "20px"
                }}
            />
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
