import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { fetchProducts } from "../app/store/services/products/reducers/product.slice";
import { wrapper } from "../app/store/store";
import bannerImg from "../assets/images/banner.jpg";
import Menu from "../app/components/Drawer/Menu/Menu";
import PhotoGaleryList from "../app/components/PhotoGalery/PhotoGaleryList";
import CatalogBeers from "../app/components/Products/Catalog/CatalogBeers";
import Image from "next/image";
import { fetchBeers } from "../app/store/services/beers/reducers/beer.slice";
import TabsUI from "../app/components/Tabs/TabsUI";
import { fetchSnacks } from "../app/store/services/snacks/reducers/snack.slice";
import CatalogSnacks from "../app/components/Products/Catalog/CatalogSnacks";
import YMapContacts from "../app/components/YandexMaps/Contacts/YMapContacts";
import HTMLReactParser from "html-react-parser";
import { decodeHtml } from "../app/helpers/stringHelper";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../app/store/reducers/header.slice";
import CatalogFish from "../app/components/Products/Catalog/CatalogFish";
import { fetchFish } from "../app/store/services/fish/reducers/fish.slice";
import Head from "next/head";
import { FC } from "react";
import { IYandexMap } from "../app/types/seo.types";

interface IMainPage {
    bannerSlogan: string,
    bannerSlogan2: string,
    titleProducts: string,
    titleGallery: string,
    titleMap: string,
    gallery: any,
    banner: any,
    titleMeta: string,
    descriptionMeta: string,
    keywordsMeta: string
}

interface IMainpageData {
    mainpage: IMainPage,
    yandexmap: IYandexMap
}

interface IHomeProps {
    data: IMainpageData
}

const Home: FC<IHomeProps> = ({ data }) => {
    const {
        bannerSlogan,
        bannerSlogan2,
        titleProducts,
        titleGallery,
        titleMap,
        gallery,
        banner,
        titleMeta,
        descriptionMeta,
        keywordsMeta
    } = data.mainpage;

    const { placeName, address, workTime, wayDesc, photosPlace } =
        data.yandexmap;
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{titleMeta}</title>
                <meta keywords={keywordsMeta}
                ></meta>
                <meta description={descriptionMeta}
                ></meta>
            </Head>
            <div className="page-container">
                <Menu
                    callbackApplyFilter={() => {}}
                    callbackResetFilter={() => {}}
                    filter={{ minPrice: 0, maxPrice: 0, productType: "" }}
                    filterList={[]}
                />
                <div>
                    {banner.length > 0 ? (
                        <Box
                            className="banner-image"
                            sx={{
                                background: `url(${banner[0].url}) center center no-repeat`,
                                height: 200,
                                width: 200,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <div className="banner-content">
                                <Typography
                                    className="banner-text"
                                    variant="subtitle1"
                                >
                                    {bannerSlogan
                                        ? HTMLReactParser(
                                              decodeHtml(bannerSlogan)
                                          )
                                        : HTMLReactParser(
                                              decodeHtml(
                                                  "Там где твои друзья<br/>Пивградъ"
                                              )
                                          )}
                                </Typography>
                                <Typography
                                    className="banner-under-text"
                                    variant="subtitle2"
                                >
                                    {bannerSlogan2
                                        ? HTMLReactParser(
                                              decodeHtml(bannerSlogan2)
                                          )
                                        : "попробуй яркий вкус свежего пива"}
                                </Typography>
                                <Button
                                    className="banner-button"
                                    variant="contained"
                                    onClick={() => {
                                        router.replace("/products/beers");
                                    }}
                                >
                                    Попробовать
                                </Button>
                            </div>
                        </Box>
                    ) : (
                        <Image
                            className="banner-image-ssr"
                            src={bannerImg}
                            quality={100}
                        />
                    )}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "60px",
                        marginBottom: "30px",
                    }}
                >
                    <Typography className="main-page-text" variant="h2">
                        {titleProducts
                            ? HTMLReactParser(decodeHtml(titleProducts))
                            : "Наш асортимент"}
                    </Typography>
                </div>
                <div style={{ marginBottom: "60px" }}>
                    <TabsUI
                        tabsList={["Пиво", "Снеки", "Рыба"]}
                        swipeableList={[
                            <CatalogBeers />,
                            <CatalogSnacks />,
                            <CatalogFish />,
                        ]}
                    />
                </div>

                {gallery.length > 0 && (
                    <>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Typography className="main-page-text" variant="h2">
                                {titleGallery
                                    ? HTMLReactParser(decodeHtml(titleGallery))
                                    : "Наш бар"}
                            </Typography>
                        </div>
                        <div style={{ marginBottom: "60px" }}>
                            <PhotoGaleryList itemsList={gallery} />
                        </div>
                    </>
                )}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "30px",
                    }}
                >
                    <Typography className="main-page-text" variant="h2">
                        {titleMap
                            ? HTMLReactParser(decodeHtml(titleMap))
                            : "Мы находимся"}
                    </Typography>
                </div>
                <YMapContacts
                    balloon={{
                        namePlace: placeName,
                        address: address,
                        image: photosPlace.data ? photosPlace.data[0].url : [],
                        workTime: workTime,
                        way: wayDesc,
                    }}
                />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: IHomeProps = {
            data: {
                mainpage: {
                    bannerSlogan: "",
                    bannerSlogan2: "",
                    titleProducts: "",
                    titleGallery: "",
                    titleMap: "",
                    titleMeta: "",
                    descriptionMeta: "",
                    keywordsMeta: "",
                    gallery: [],
                    banner: [],
                },
                yandexmap: {
                    placeName: "",
                    address: "",
                    workTime: "",
                    wayDesc: "",
                    photosPlace: {},
                },
            },
        };

        const resultMainPage = await cmsQueryExecute(
            "/api/main-page?populate=*"
        );

        if (resultMainPage) {
            resultMainPage.gallery = resultMainPage.gallery.data;
            resultMainPage.banner = resultMainPage.banner.data;
            props.data.mainpage = resultMainPage;
        }

        const resultMapPoints = await cmsQueryExecute(
            "/api/yandex-map-points?populate=*"
        );

        if (resultMapPoints.length > 0) {
            props.data.yandexmap = resultMapPoints[0];
        }

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        await store.dispatch(
            fetchBeers({
                page: 0,
                limitPage: 3,
                isActive: "true",
                isPromote: "true",
            })
        );

        await store.dispatch(
            fetchSnacks({
                page: 0,
                limitPage: 3,
                isActive: "true",
                isPromote: "true",
            })
        );

        await store.dispatch(
            fetchFish({
                page: 0,
                limitPage: 3,
                isActive: "true",
                isPromote: "true",
            })
        );

        return {
            props,
        };
    });

export default Home;
