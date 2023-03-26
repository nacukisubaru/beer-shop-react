import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { queryBuilder } from "../../../app/helpers/queryHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../../app/store/reducers/header.slice";
import { IBeer } from "../../../app/store/services/beers/types/beer.type";
import { wrapper } from "../../../app/store/store";import axios from "axios";
import { FC } from "react";
import { cmsQueryExecute } from "../../../app/helpers/cmsHelper";
import { IProductBasket } from "../../../app/types/product.types";
import ProductDetail from "../../../app/components/Products/ProductDetail";
import HTMLReactParser from "html-react-parser";
import { decodeHtml } from "../../../app/helpers/stringHelper";

interface IBeerMetaTags {
    titleBeerMeta: string;
    descBeerMeta: string;
    keywordsBeerMeta: string;
}

interface IBeerDetailProps {
    product: any;
    metaTags: IBeerMetaTags;
}

const BeerDetail: FC<IBeerDetailProps> = ({ product, metaTags }) => {
    const productDetail: IBeer = product;
    const productBasket: IProductBasket = productDetail.product;

    return (
        <ProductDetail
            seoProps={{
                title:
                    productDetail.product.title +
                    " " +
                    metaTags.titleBeerMeta +
                    " | Пивградъ",
                desc: `Купить пиво ${productDetail.product.title} в Калуге. ${metaTags.descBeerMeta}`,
                keywords: `${metaTags.keywordsBeerMeta} ${productDetail.product.title}, 
                пиво ${productDetail.product.title}, пиво ${productDetail.product.title} купить`,
            }}
            productProps={{
                image: productDetail.product.image,
                title: productDetail.product.title,
                description: productDetail.product.description,
                characteristics: [
                    {
                        label: "Цена",
                        name: HTMLReactParser(
                            decodeHtml(
                                `${productDetail.product.price} &#x20bd;`
                            )
                        ),
                    },
                    { label: "Состав", name: productDetail.compound },
                    {
                        label: "Сорта",
                        name: productDetail.grades
                            .map((grade) => grade.name)
                            .toString(),
                    },
                    { label: "Крепкость", name: productDetail.fortress },
                    { label: "IBU", name: productDetail.ibu },
                    { label: "Бренд", name: productDetail.product.brandName },
                    { label: "Объём", name: productDetail.volume },
                    {
                        label: "Упаковка",
                        name: productDetail.product.typePackagingName,
                    },
                    {
                        label: "На розлив",
                        name: productDetail.forBottling ? "Да" : "Нет",
                    },
                    {
                        label: "Фильтрованное",
                        name: productDetail.filtered ? "Да" : "Нет",
                    },
                    {
                        label: "В наличии",
                        name: productDetail.product.inStock ? "Да" : "Нет",
                    },
                ],
            }}
            buyProps={{
                productBasket,
                productInStock: productDetail.product.inStock,
            }}
            redirectUrl="/products/beers"
        />
    );
};

export default BeerDetail;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ res }) => {
        const props: IBeerDetailProps = {
            product: {},
            metaTags: {
                titleBeerMeta: "Лучшее пиво по отличной цене",
                descBeerMeta: "Большой ассортимент пива в лучшем баре Калуги Пивградъ. Купите пиво по отличной цене.",
                keywordsBeerMeta: "Каталог пива, пиво, пиво в Калуге, купить пиво в Калуге, купить пиво, вкусное пиво, крафт пиво, крафтовое пиво",
            },
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
