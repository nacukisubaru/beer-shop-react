import { FC } from "react";
import { useDispatch } from "react-redux";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { useActions } from "../../app/hooks/useActions";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { fetchProducts } from "../../app/store/services/products/reducers/product.slice";
import { GetServerSideProps } from "next";
import { wrapper } from "../../app/store/store";
import { limitPage } from "../../app/http/http.request.config";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../app/store/reducers/header.slice";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import Filters from "../../app/components/Products/Beers/Filters";
import ProductsList from "../../app/components/Products/ProductsList";
import Menu from "../../app/components/Drawer/Menu/Menu";
import FishModal from "../../app/components/Modals/Products/FishModal";
import ItemFilterMenu from "../../app/components/Drawer/Items/ItemFilterMenu";
import CheckboxFilterList from "../../app/components/Filters/Checkbox/CheckboxFilterList";
import { fishTypesApi } from "../../app/store/services/fish/fish.api";
import { cmsQueryExecute } from "../../app/helpers/cmsHelper";
import Head from "next/head";

interface IFishMetaTags {
    titleFishsMeta: string;
    descFishsMeta: string;
    keywordsFishsMeta: string;
}

interface IFishProps {
    metaTags: IFishMetaTags;
}

const Fish: FC<IFishProps> = ({ metaTags }) => {
    const { product, productList } = useAppSelector(
        (state) => state.productReducer
    );
    const {
        openModalNotFoundByFilter,
        closeModalNotFoundByFilter,
        addFishType,
    } = useActions();
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.modalNotFoundByFilter
    );

    const { fishTypes } = useAppSelector(
        (state) => state.filterProductsReducer
    );

    const fishTypesList: any = fishTypesApi.useGetListQuery({});

    const addFishTypeFilter = (id: number) => {
        return addFishType({ id });
    };

    return (
        <>
            <Head>
                <meta name="keywords" content={metaTags.keywordsFishsMeta}></meta>
                <meta
                    name="description"
                    content={metaTags.descFishsMeta}
                ></meta>
                <title>{metaTags.titleFishsMeta + " | Пивградъ"}</title>
            </Head>
            <div className="page-container">
                <Menu
                    productType="fish"
                    filterList={[
                        <ItemFilterMenu
                            key="Разновидность"
                            name="Разновидность"
                            component={
                                <CheckboxFilterList
                                    list={
                                        fishTypesList ? fishTypesList.data : []
                                    }
                                    selectedList={fishTypes}
                                    setFilter={addFishTypeFilter}
                                />
                            }
                        />,
                    ]}
                />
                <ProductsList
                    productType="fish"
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
                    <FishModal />
                )}
            </div>
        </>
    );
};

export default Fish;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: IFishProps = {
            metaTags: {
                titleFishsMeta: "Каталог рыбы | Пивградъ",
                descFishsMeta: "Покупайте рыбку к пиву в лучшем баре Калуги Пивграде.",
                keywordsFishsMeta: "Каталог рыбы, рыба, рыба в Калуге, купить рыбу в Калуге, купить рыбу, вкусная рыба, копченая рыба, купить копченую рыбу, купить копченую рыбу в Калуге, купить рыбу к пиву, купить рыбу к пиву в Калуге",
            },
        };

        const resultMeta = await cmsQueryExecute(
            "/api/catalog-product-meta?populate=*"
        );

        if (resultMeta) {
            props.metaTags = resultMeta;
        }

        await store.dispatch(
            fetchProducts("/fish/getListByFilter/", {
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
