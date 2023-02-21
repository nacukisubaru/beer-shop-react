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
import { FC } from "react";
import { cmsQueryExecute } from "../../../app/helpers/cmsHelper";

interface ISnackMetaTags {
    titleSnackMeta: string;
    descSnackMeta: string;
    keywordsSnackMeta: string;
}

interface ISnackDetailProps {
    product: any;
    metaTags: ISnackMetaTags;
}

const SnackDetail: FC<ISnackDetailProps> = ({ product, metaTags }) => {
    const productDetail: ISnack = product;

    return (
        <>
            <Head>
                <meta
                    keywords={`${metaTags.keywordsSnackMeta} 
                    ${productDetail.product.title}, снеки ${productDetail.product.title} к пиву, снеки ${productDetail.product.title} купить,`}
                ></meta>
                <meta
                    description={`Купить снеки ${productDetail.product.title} в Калуге. ${metaTags.descSnackMeta}`}
                ></meta>
                <title>{productDetail.product.title} {metaTags.titleSnackMeta} | Пивградъ</title>
            </Head>
            <div className={styles.detailCardWrapp}>
                <div className={styles.detailWrapper}>
                    <div>
                        <Box
                            className={styles.detailImage}
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
                            В наличии:{" "}
                            {productDetail.product.inStock ? "Да" : "Нет"}
                        </Typography>
                    </div>
                </div>

                <div className={styles.description}>
                    <Typography variant="h5">Описание:</Typography>
                    <Typography>{productDetail.product.description}</Typography>
                </div>
            </div>
        </>
    );
};

export default SnackDetail;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ res }) => {
        const props: ISnackDetailProps = {
            product: {},
            metaTags: {
                titleSnackMeta: "",
                descSnackMeta : "",
                keywordsSnackMeta: ""
            }
        };

        const resultMeta = await cmsQueryExecute(
            "/api/catalog-product-meta?populate=*"
        );

        if (resultMeta) {
            props.metaTags = resultMeta;
        }

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
