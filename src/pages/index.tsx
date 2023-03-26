import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { wrapper } from "../app/store/store";
import { fetchBeers } from "../app/store/services/beers/reducers/beer.slice";
import { fetchSnacks } from "../app/store/services/snacks/reducers/snack.slice";
import { decodeHtml } from "../app/helpers/stringHelper";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../app/store/reducers/header.slice";
import { fetchFish } from "../app/store/services/fish/reducers/fish.slice";
import { FC } from "react";
import { IYandexMap } from "../app/types/seo.types";
import Head from "next/head";
import CatalogSnacks from "../app/components/Products/Catalog/CatalogSnacks";
import YMapContacts from "../app/components/YandexMaps/Contacts/YMapContacts";
import HTMLReactParser from "html-react-parser";
import TabsUI from "../app/components/Tabs/TabsUI";
import CatalogFish from "../app/components/Products/Catalog/CatalogFish";
import Menu from "../app/components/Drawer/Menu/Menu";
import PhotoGaleryList from "../app/components/PhotoGalery/PhotoGaleryList";
import CatalogBeers from "../app/components/Products/Catalog/CatalogBeers";
import { host } from "../app/http/http.request.config";

interface IMainPage {
    bannerSlogan: string;
    bannerSlogan2: string;
    titleProducts: string;
    titleGallery: string;
    titleMap: string;
    gallery: any;
    banner: any;
    titleMeta: string;
    descriptionMeta: string;
    keywordsMeta: string;
}

interface IMainpageData {
    mainpage: IMainPage;
    yandexmap: IYandexMap;
}

interface IHomeProps {
    data: IMainpageData;
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
        keywordsMeta,
    } = data.mainpage;

    const { placeName, address, workTime, wayDesc, photosPlace } =
        data.yandexmap;
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{titleMeta}</title>
                <meta name="keywords" content={keywordsMeta}></meta>
                <meta name="description" content={descriptionMeta}></meta>
            </Head>
            <div className="page-container">
                <Menu filterList={[]} productType="beers" />
                <div>
                    <Box
                        className="banner-image"
                        sx={{
                            background: `url(${banner[0].url}) center center no-repeat`,
                            backgroundSize: "cover"
                        }}
                    >
                        <div className="banner-content">
                            <Typography
                                variant="subtitle1"
                            >
                                {HTMLReactParser(decodeHtml(bannerSlogan))}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                            >
                                {HTMLReactParser(decodeHtml(bannerSlogan2))}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{borderRadius: "19px"}}
                                onClick={() => {
                                    router.replace("/products/beers");
                                }}
                            >
                                Попробовать
                            </Button>
                        </div>
                    </Box>          
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
                        {HTMLReactParser(decodeHtml(titleProducts))}
                    </Typography>
                </div>
                <div style={{ marginBottom: "60px" }}>
                    <TabsUI
                        tabsList={["Пиво", "Снеки", "Рыба"]}
                        swipeableList={[
                            <CatalogBeers key="Пиво" />,
                            <CatalogSnacks key="Снеки" />,
                            <CatalogFish key="Рыба" />,
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
                                {HTMLReactParser(decodeHtml(titleGallery))}
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
                        {HTMLReactParser(decodeHtml(titleMap))}
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
                    bannerSlogan: "Там где твои друзья<br/>Пивградъ",
                    bannerSlogan2: "попробуй яркий вкус свежего пива",
                    titleProducts: "Наш асортимент",
                    titleGallery: "Наш бар",
                    titleMap: "Мы находимся",
                    titleMeta: "Пивградъ",
                    descriptionMeta: "Лучший пивбар в Калуге",
                    keywordsMeta: "Пивградъ, пиво, пиво в Калуге, Калуга, снеки, рыба, снеки в Калуге, рыба в Калуге, Купить рыбу в Калуге, Купить снеки в Калуге, Купить пиво в Калуге",
                    gallery: [
                        {url: host + "/assets/beergrad-photo1.png", title: "Пивградъ вход"},
                        {url: host + "/assets/beergrad-photo2.jpg", title: "Пивградъ вход"},
                        {url: host + "/assets/beergrad-photo3.jpg", title: "Пивградъ ассортимент"}, 
                        {url: host + "/assets/beergrad-photo4.jpg", title: "Пивградъ ассортимент"}, 
                        {url: host + "/assets/beergrad-photo5.jpg", title: "Пивградъ ассортимент"}, 
                    ],
                    banner: [{url: host + "/assets/banner.jpg"}],
                },
                yandexmap: {
                    placeName: "Пивградъ бар",
                    address: "ул. Братьев Луканиных, 7, Калуга",
                    workTime: "10:00-20:00",
                    wayDesc: "Остановка Кошелев-проект м-н, Ленинский округ, Калуга",
                    photosPlace:  {data: [{url: host + "/assets/beergrad-photo1.png"}]},
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
