import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { queryBuilder } from "../../../app/helpers/queryHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../../app/store/reducers/header.slice";
import { IFish } from "../../../app/store/services/fish/types/fish.type";
import { wrapper } from "../../../app/store/store";
import styles from "../../products/styles/product.module.css";
import axios from "axios";
import Head from "next/head";
import { FC } from "react";
import { cmsQueryExecute } from "../../../app/helpers/cmsHelper";
import Menu from "../../../app/components/Drawer/Menu/Menu";
import { useBuyProduct } from "../../../app/hooks/useBuyProduct";
import { IProductBasket } from "../../../app/types/product.types";
import CustomSnackBar from "../../../app/components/CustomUI/CustomSnackBar/CustomSnackBar";
import Link from "next/link";

interface IFishMetaTags {
    titleFishMeta: string;
    descFishMeta: string;
    keywordsFishMeta: string;
}

interface IFishDetailProps {
    product: any;
    metaTags: IFishMetaTags;
}

const FishDetail: FC<IFishDetailProps> = ({ product, metaTags }) => {
    const productDetail: IFish = product;
    const productBasket: IProductBasket = productDetail.product;
    const { buyProduct, inBasket, isBuyBtnClick } = useBuyProduct(productBasket);

    return (
        <>
            <Head>
                <meta
                    keywords={`${metaTags.keywordsFishMeta} ${productDetail.product.title}, 
                    рыба ${productDetail.product.title}, рыба ${productDetail.product.title} купить`}
                ></meta>
                <meta
                    description={`Купить рыбу ${productDetail.product.title} в Калуге. ${metaTags.descFishMeta}`}
                ></meta>
                <title>{productDetail.product.title + " " + metaTags.titleFishMeta + " | Пивградъ"}</title>
            </Head>
            <Menu
                filterList={[]}
                productType="beers"
            />
            <div className={styles.detailCardWrapp}>
                <Link href="/products/fish"><Typography>&#8592; Назад</Typography></Link>
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
                        <Typography 
                            variant="h5"
                            style={{ marginBottom: "5px" }}
                        >
                            {productDetail.product.title}
                        </Typography>
                        <Typography>Вес: {productDetail.weight}</Typography>
                        <Typography>
                            Разновидность: {productDetail.fishTypeName}
                        </Typography>
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
                        <Button
                            variant={inBasket ? "outlined" : "contained"}
                            style={{ width: "200px", marginTop: "14px" }}
                            disabled={
                                productDetail.product.inStock ? false : true
                            }
                            onClick={buyProduct}
                        >
                            {inBasket
                                ? "Перейти в корзину"
                                : "Добавить корзину"}
                        </Button>
                    </div>
                </div>
                <div className={styles.description}>
                    <Typography variant="h5">Описание:</Typography>
                    <Typography>{productDetail.product.description}</Typography>
                </div>
            </div>
            <CustomSnackBar
                severity="success"
                message="Товар добавлен в корзину"
                isOpen={isBuyBtnClick}
            />
        </>
    );
};

export default FishDetail;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ res }) => {
        const props: IFishDetailProps = {
            product: {},
            metaTags: {
                titleFishMeta: "",
                descFishMeta : "",
                keywordsFishMeta: ""
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
            const path = queryBuilder(`/fish/getById/${id}`, {});
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
