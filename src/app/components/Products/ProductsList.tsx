import { Button } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFilter } from "../../hooks/useFilter";
import { useProductMap } from "../../hooks/useProductMap";
import { productApi } from "../../store/services/products/product.api";
import { getMinAndMaxPriceProducts } from "../../store/services/products/reducers/product.slice";
import { productType } from "../../store/types/api.types";
import CardList from "../Cards/CardList";
import CardRedirect, { ILink, ISettingsCardRedirect } from "../Cards/CardRedirect";
import CardSmall, { ISettingsCard } from "../Cards/CardSmall";
import InputSearch from "../Search/InputSearch";
import SortPanel from "../SortPanel/SortPanel";

interface IRedirectCardProps {
    linkProps: ILink,
    settingCardRedirectProps: ISettingsCardRedirect
}

interface IProductList {
    productType: productType;
    showTools?: boolean;
    loadingByScroll?: boolean;
    settingsCardProps: ISettingsCard;
    redirectCardProps?: IRedirectCardProps;
}

const ProductsList: FC<IProductList> = ({
    productType,
    showTools,
    loadingByScroll,
    settingsCardProps,
    redirectCardProps
}) => {
    const { page, status } = useAppSelector((state) => state.productReducer);
    const { getProduct, openProduct } = useActions();
    const { productList } = useAppSelector((state) => state.productReducer);
    const { q } = useAppSelector((state) => state.filterProductsReducer);
    const products = useProductMap(productList, true);
    const [addShow] = productApi.useAddShowMutation();
    const dispatch = useDispatch();

    const {
        fetchProducts,
        fetchProductsWithSort,
        fetchProductsBySearch,
        productsSearchByName,
        resetListAndFetchProducts,
        fetchProductsBySearchWithSort,
    } = useFilter(productType);

    useEffect(() => {
        dispatch(getMinAndMaxPriceProducts(productType));
    }, []);

    const showProduct = (id: number) => {
        getProduct({ id });
        openProduct();
        addShow(id);
    };

    return (
        <>
            {showTools && (
                <>
                    <InputSearch
                        search={productsSearchByName}
                        reset={resetListAndFetchProducts}
                    />
                    <SortPanel fetchData={q ? fetchProductsBySearchWithSort: fetchProductsWithSort}
                    />
                </>
            )}
            {productList.length > 0 && (
                <>
                    <CardList
                        cardsList={products}
                        fetch={q ? fetchProductsBySearch : fetchProducts}
                        page={page}
                        scrollList={
                            status === "resolved" && loadingByScroll
                                ? true
                                : false
                        }
                        filterBtn={true}
                        show={showProduct}
                        settingsCardProps={settingsCardProps}
                        childrenComponent={
                            redirectCardProps && (
                                <CardRedirect
                                    settingsCardProps={redirectCardProps.settingCardRedirectProps}
                                    linkProps={redirectCardProps.linkProps}
                                />
                            )
                        }
                    ></CardList>
                </>
            )}
        </>
    );
};

export default ProductsList;
