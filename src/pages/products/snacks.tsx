import { GetServerSideProps } from "next";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { useActions } from "../../app/hooks/useActions";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { limitPage } from "../../app/http/http.request.config";
import { fetchProducts } from "../../app/store/services/products/reducers/product.slice";
import { wrapper } from "../../app/store/store";
import Menu from "../../app/components/Drawer/Menu/Menu";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import SnackModal from "../../app/components/Modals/Products/SnackModal";
import ProductsList from "../../app/components/Products/ProductsList";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../app/store/reducers/header.slice";
import { FC } from "react";
import { cmsQueryExecute } from "../../app/helpers/cmsHelper";
import Head from "next/head";

interface ISnacksMetaTags {
    titleSnacksMeta: string;
    descSnacksMeta: string;
    keywordsSnacksMeta: string;
}

interface ISnacksProps {
    metaTags: ISnacksMetaTags;
}

const Snacks: FC<ISnacksProps> = ({ metaTags }) => {
    const { product, productList } = useAppSelector(
        (state) => state.productReducer
    );
    const { openModalNotFoundByFilter, closeModalNotFoundByFilter } =
        useActions();
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.modalNotFoundByFilter
    );

    return (
        <>
            <Head>
                <meta keywords={metaTags.keywordsSnacksMeta}></meta>
                <meta description={metaTags.descSnacksMeta}></meta>
                <title>{metaTags.titleSnacksMeta} | Пивградъ</title>
            </Head>
            <div className="page-container">
                <Menu productType="snacks" filterList={[]} />
                <ProductsList
                    productType="snacks"
                    showTools={true}
                    loadingByScroll={true}
                    settingsCardProps={{
                        card: {
                            width: "300px",
                            height: "390px",
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
                    <SnackModal />
                )}
            </div>
        </>
    );
};

export default Snacks;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: ISnacksProps = {
            metaTags: {
                titleSnacksMeta: "",
                descSnacksMeta: "",
                keywordsSnacksMeta: "",
            },
        };

        const resultMeta = await cmsQueryExecute(
            "/api/catalog-product-meta?populate=*"
        );

        if (resultMeta) {
            props.metaTags = resultMeta;
        }

        await store.dispatch(
            fetchProducts("/snacks/getListByFilter/", {
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
