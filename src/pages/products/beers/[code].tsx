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
import { FC } from "react";
import { cmsQueryExecute } from "../../../app/helpers/cmsHelper";
import Menu from "../../../app/components/Drawer/Menu/Menu";

interface IBeerMetaTags {
    titleBeerMeta: string;
    descBeerMeta: string;
    keywordsBeerMeta: string;
}

interface IBeerDetailProps {
    product: any,
    metaTags: IBeerMetaTags
}

const BeerDetail: FC<IBeerDetailProps> = ({ product, metaTags }) => {
    const productDetail: IBeer = product;

    return (
        <>
            <Head>
                <meta
                    keywords={`${metaTags.keywordsBeerMeta} ${productDetail.product.title}, 
                    пиво ${productDetail.product.title}, пиво ${productDetail.product.title} купить`}
                ></meta>
                <meta
                    description={`Купить пиво ${productDetail.product.title} в Калуге. ${metaTags.descBeerMeta}`}
                ></meta>
                <title>{productDetail.product.title} {metaTags.titleBeerMeta} | Пивградъ</title>
            </Head>
            <Menu
                filterList={[]}
                productType="beers"
            />
            <div className={styles.detailCardWrapp}>
                <div className={styles.detailWrapper}>
                    <div>
                        <Box
                            className={styles.detailImage}
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
                            На розлив:{" "}
                            {productDetail.forBottling ? "Да" : "Нет"}
                        </Typography>
                        <Typography>
                            Фильтрованное:{" "}
                            {productDetail.filtered ? "Да" : "Нет"}
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

export default BeerDetail;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ res }) => {
        const props: IBeerDetailProps = {
            product: {},
            metaTags: {
                titleBeerMeta: "",
                descBeerMeta : "",
                keywordsBeerMeta: ""
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
