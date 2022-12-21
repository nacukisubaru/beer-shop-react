import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFilter } from "../../hooks/useFilter";
import { useProductMap } from "../../hooks/useProductMap";
import { useBeerList } from "../../hooks/useProducts";
import { productApi } from "../../store/services/products/product.api";
import CardList from "../Cards/CardList";
import InputSearch from "../Search/InputSearch";
import SortPanel from "../SortPanel/SortPanel";

interface IProductList {
    productType: string
}

const ProductsList: FC<IProductList> = ({productType}) => {
    const { page, status } = useAppSelector((state) => state.productReducer);
    const { getProduct, openProduct } = useActions();
    const { productList } = useAppSelector((state) => state.productReducer);
    const {q} = useAppSelector((state) => state.filterProductsReducer);
    const products = useProductMap(productList, true);
    const [addShow] = productApi.useAddShowMutation();

    const { 
        fetchProducts, 
        fetchProductsWithSort, 
        fetchProductsBySearch, 
        productsSearchByName, 
        resetListAndFetchProducts, 
        fetchProductsBySearchWithSort 
    } = useFilter(productType);

    //useBeerList();

    const showProduct = (id: number) => {
        getProduct({ id });
        openProduct();
        addShow(id);
    };

    console.log({status, productList})

    return (
        <>
            <InputSearch search={productsSearchByName} reset={resetListAndFetchProducts} />
            <SortPanel fetchData={q ? fetchProductsBySearchWithSort : fetchProductsWithSort} />
            {productList.length > 0 && (
                <>
                    <CardList
                        cardsList={products}
                        fetch={q ? fetchProductsBySearch: fetchProducts}
                        page={page}
                        scrollList={status === "resolved" ? true : false}
                        show={showProduct}
                    ></CardList>
                </>
            )}
        </>
    );
};

export default ProductsList;
