import React, { FC, useEffect } from "react";
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
import {
    getMinAndMaxFortressBeers,
    getMinAndMaxVolumeBeers,
} from "../../app/store/services/beers/reducers/beer.slice";
import { useDispatch } from "react-redux";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../app/store/reducers/header.slice";
import { cmsQueryExecute } from "../../app/helpers/cmsHelper";
import Head from "next/head";

interface IBeersMetaTags {
    titleBeersMeta: string;
    descBeersMeta: string;
    keywordsBeersMeta: string;
}

interface IBeersProps {
    metaTags: IBeersMetaTags;
}

const Beers: FC<IBeersProps> = ({ metaTags }) => {
    const { product, productList } = useAppSelector(
        (state) => state.productReducer
    );
    const { openModalNotFoundByFilter, closeModalNotFoundByFilter } =
        useActions();
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.modalNotFoundByFilter
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMinAndMaxVolumeBeers());
        dispatch(getMinAndMaxFortressBeers());
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content={metaTags.keywordsBeersMeta}
                ></meta>
                <meta
                    name="description"
                    content={metaTags.descBeersMeta}
                ></meta>
                <title>{metaTags.titleBeersMeta + " | Пивградъ"}</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <div className="page-container">
                <Menu productType="beers" filterList={[<Filters key="sds" />]} />
                <ProductsList
                    productType="beers"
                    showTools={true}
                    loadingByScroll={true}
                    settingsCardProps={{
                        card: {
                            width: "300px",
                            height: "400px",
                        },
                        button: { width: "279px", height: "30px" },
                        titleSize: "18px",
                        imageHeight: "200px",
                        priceSize: "20px",
                        showDetailBtn: true,
                    }}
                />
                <ResultNotFoundByFilter
                    openModalNotFoundByFilter={openModalNotFoundByFilter}
                    closeModalNotFoundByFilter={closeModalNotFoundByFilter}
                    isOpen={isOpen}
                />
                {productList.length > 0 && !isEmptyObject(product) && (
                    <BeerModal />
                )}
            </div>
        </>
    );
};

export default Beers;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: IBeersProps = {
            metaTags: {
                titleBeersMeta: "Каталог пива",
                descBeersMeta: "Лучшее пиво в лучшем пивбаре Калуги. Пивградъ. В нашем баре широкий ассортимент пива и закусок к нему",
                keywordsBeersMeta: "Каталог пива, пиво, пиво в Калуге, купить пиво в Калуге, купить пиво, вкусное пиво, крафт пиво, крафтовое пиво, пивас, купить пивас",
            },
        };

        const resultMeta = await cmsQueryExecute(
            "/api/catalog-product-meta?populate=*"
        );

        if (resultMeta) {
            props.metaTags = resultMeta;
        }

        await store.dispatch(
            fetchProducts("/beers/getListByFilter/", {
                page: 0,
                limitPage,
                isActive: "true",
                sortField: "price",
                order: "ASC",
            })
        );

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        return {
            props,
        };
    });
