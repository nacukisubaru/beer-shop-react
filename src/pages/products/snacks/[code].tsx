import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { queryBuilder } from "../../../app/helpers/queryHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../../app/store/reducers/header.slice";
import { ISnack } from "../../../app/store/services/snacks/types/snacks.types";
import { wrapper } from "../../../app/store/store";
import axios from "axios";
import styles from "../../products/styles/product.module.css";
import Head from "next/head";

export default function ({ product }) {
    const productDetail: ISnack = product;

    return (
        <>
            <Head>
                <meta keywords="ss"></meta>
                <meta description="ss"></meta>
                <title>{productDetail.product.title}</title>
            </Head>
            <div style={{ margin: "25px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <Box
                            style={{
                                backgroundSize: "contain",
                                height: "383px",
                                width: "360px",
                            }}
                            sx={{
                                background: `url(${product.product.image}) center center no-repeat`,
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
                        <Typography>Вес: {productDetail.weight}</Typography>
                        <Typography>
                            Бренд: {productDetail.product.brandName}
                        </Typography>
                        <Typography>
                            Упаковка: {productDetail.product.typePackagingName}
                        </Typography>
                        <Typography>
                            В наличии: {productDetail.product.inStock}
                        </Typography>
                    </div>
                </div>
                
                    <Typography>
                        Описание: {productDetail.product.description}
                    </Typography>
          
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
            const path = queryBuilder(`/snacks/getById/${id}`, {});
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
