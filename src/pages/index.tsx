import { Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { fetchProducts } from "../app/store/services/products/reducers/product.slice";
import { wrapper } from "../app/store/store";
import banner from "../assets/images/banner.jpg";
import Menu from "../app/components/Drawer/Menu/Menu";
import PhotoGaleryList from "../app/components/PhotoGalery/PhotoGaleryList";
import CatalogBeers from "../app/components/Products/Beers/CatalogBeers";
import Image from "next/image";

const Home = () => {
    const router = useRouter();
    return (
        <>
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
                        <Typography
                            className="banner-text2"
                            variant="h2"
                        >
                            Пивградъ
                        </Typography>
                        <Typography
                            className="banner-under-text"
                            variant="h4"
                        >
                            попробуй яркий вкус, свежего пива
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography className="main-page-text" variant="h2">
                        Пиво
                    </Typography>
                </div> 
                 <CatalogBeers />

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography className="main-page-text" variant="h2">
                        Наш бар
                    </Typography>
                </div>
                <PhotoGaleryList />
            </div>
        </>
    );
};


export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        await store.dispatch(
            fetchProducts("/beers/getListByFilter/", {
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
