import { FC } from "react";
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
import { cmsQueryExecute } from "../../../app/helpers/cmsHelper";
import { IProductBasket } from "../../../app/types/product.types";
import { decodeHtml } from "../../../app/helpers/stringHelper";
import axios from "axios";
import ProductDetail from "../../../app/components/Products/ProductDetail";
import HTMLReactParser from "html-react-parser";

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
    const productBasket: IProductBasket = productDetail.product;

    return (
        <ProductDetail
            seoProps={{
                title:
                    productDetail.product.title +
                    " " +
                    metaTags.titleSnackMeta +
                    " | Пивградъ",
                desc: `Купить снеки ${productDetail.product.title} в Калуге. ${metaTags.descSnackMeta}`,
                keywords: `${metaTags.keywordsSnackMeta} 
                ${productDetail.product.title}, снеки ${productDetail.product.title} к пиву, снеки ${productDetail.product.title} купить`,
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
                    { label: "Вес", name: productDetail.weight },
                    { label: "Бренд", name: productDetail.product.brandName },
                    {
                        label: "Упаковка",
                        name: productDetail.product.typePackagingName,
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
            redirectUrl="/products/snacks"
        />
    );
};

export default SnackDetail;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ res }) => {
        const props: ISnackDetailProps = {
            product: {},
            metaTags: {
                titleSnackMeta: "Вкусные снеки",
                descSnackMeta: "Большой ассортимент снеков в лучшем баре Калуги Пивградъ. Купите снеки по отличной цене.",
                keywordsSnackMeta: "снеки в Калуге, купить снеки в Калуге, купить снеки к пиву, снеки, купить снеки к пиву в Калуге, вкусные снеки, вкусные снеки к пиву",
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
