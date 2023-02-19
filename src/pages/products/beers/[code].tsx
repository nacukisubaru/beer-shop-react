import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { queryBuilder } from "../../../app/helpers/queryHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../../app/store/reducers/header.slice";
import { IBeer } from "../../../app/store/services/beers/types/beer.type";
import { wrapper } from "../../../app/store/store";
import styles from "../../products/styles/product.module.css";
import axios from "axios";
import Head from "next/head";

export default function ({ product }) {
    const productDetail: IBeer = product;

    return (
        <>
            <Head>
                <meta keywords="ss"></meta>
                <meta description="ss"></meta>
                <title>{productDetail.product.title}</title>
            </Head>
            <div style={{ margin: "85px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "55px" }}>
                    <div>
                        <Box
                            style={{
                                backgroundSize: "contain",
                                height: "383px",
                                width: "360px",
                            }}
                            sx={{
                                background: `url(${productDetail.product.image}) center center no-repeat`,
                            }}
                        ></Box>
                    </div>
                    <div className={styles.detailInfo}>
                        <Typography variant="h5">
                            {productDetail.product.title}
                        </Typography>
                        <Typography
                            variant="h5"
                            style={{ marginBottom: "5px" }}
                        >
                            Характеристики:
                        </Typography>
                        <Typography>
                            Состав: {productDetail.compound}
                        </Typography>
                        <Typography>Объём: {productDetail.volume}</Typography>
                        <Typography>
                            Крепкость: {productDetail.fortress}
                        </Typography>
                        <Typography>ibu: {productDetail.ibu}</Typography>
                        <Typography>
                            Бренд: {productDetail.product.brandName}
                        </Typography>
                        <Typography>
                            Упаковка: {productDetail.product.typePackagingName}
                        </Typography>
                        <Typography>
                            На розлив: {productDetail.forBottling}
                        </Typography>
                        <Typography>
                            Фильтрованное: {productDetail.filtered}
                        </Typography>
                        <Typography>
                            В наличии: {productDetail.product.inStock}
                        </Typography>
                    </div>
                </div>
                <div className={styles.description}>
                    <Typography variant="h5">
                        Описание:
                    </Typography>
                    <Typography>
                        {productDetail.product.description}
                    </Typography>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ res }) => {
        const props: any = {
            product: {},
        };

        const url = res.req.url;
        if (url) {
            const arrayUrl = url.split("/");
            const id = arrayUrl[3];
            const path = queryBuilder(`/beers/getById/${id}`, {});
            const result = await axios.get(path);
            if (result.data) {
                props.product = result.data;
            }
        }

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        return {
            props,
        };
    });
