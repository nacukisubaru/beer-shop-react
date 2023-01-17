import { Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { fetchProducts } from "../app/store/services/products/reducers/product.slice";
import { wrapper } from "../app/store/store";
import banner from "../assets/images/banner.jpg";
import Menu from "../app/components/Drawer/Menu/Menu";
import PhotoGaleryList from "../app/components/PhotoGalery/PhotoGaleryList";
import CatalogBeers from "../app/components/Products/Catalog/CatalogBeers";
import Image from "next/image";
import { fetchBeers } from "../app/store/services/beers/reducers/beer.slice";
import TabsUI from "../app/components/Tabs/TabsUI";
import { fetchSnacks } from "../app/store/services/snacks/reducers/snack.slice";
import CatalogSnacks from "../app/components/Products/Catalog/CatalogSnacks";
import YMapContacts from "../app/components/YandexMaps/Contacts/YMapContacts";

const Home = () => {
    const router = useRouter();
    return (
        <div className="page-container">
            <Menu
                callbackApplyFilter={() => {}}
                callbackResetFilter={() => {}}
                filter={{ minPrice: 0, maxPrice: 0, productType: "" }}
                filterList={[]}
            />
            <div>
                <div className="banner">
                    <Typography className="banner-text" variant="h2">
                        Там где твои друзья
                    </Typography>
                    <Typography className="banner-text2" variant="h2">
                        Пивградъ
                    </Typography>
                    <Typography className="banner-under-text" variant="h4">
                        попробуй яркий вкус свежего пива
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
                <Image
                    className="banner-image"
                    src={banner}
                    quality={100}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "60px", marginBottom: "30px" }}>
                <Typography className="main-page-text" variant="h2">
                    Наш асортимент
                </Typography>
            </div>
            <div style={{marginBottom: "60px"}}>
                <TabsUI
                    tabsList={["Пиво", "Снеки", "Рыба"]}
                    swipeableList={[<CatalogBeers />, <CatalogSnacks />]}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography className="main-page-text" variant="h2">
                    Наш бар
                </Typography>
            </div>
            <div style={{marginBottom: "60px"}}>
                <PhotoGaleryList />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                <Typography className="main-page-text" variant="h2">
                    Мы находимся
                </Typography>
            </div>
           <YMapContacts />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        await store.dispatch(
            fetchBeers({
                page: 0,
                limitPage: 3,
                isActive: "true",
            })
        );

        await store.dispatch(
            fetchSnacks({
                page: 0,
                limitPage: 3,
                isActive: "true",
            })
        );

        return {
            props: {},
        };
    });

export default Home;
