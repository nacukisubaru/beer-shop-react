import { FC } from "react";
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
import { cmsQueryExecute } from "../../../app/helpers/cmsHelper";
import { IProductBasket } from "../../../app/types/product.types";
import { decodeHtml } from "../../../app/helpers/stringHelper";
import axios from "axios";
import ProductDetail from "../../../app/components/Products/ProductDetail";
import HTMLReactParser from "html-react-parser";

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

    return (
        <ProductDetail
            seoProps={{
                title:
                    productDetail.product.title +
                    " " +
                    metaTags.titleFishMeta +
                    " | Пивградъ",
                desc: `Купить рыбу ${productDetail.product.title} в Калуге. ${metaTags.descFishMeta}`,
                keywords: `${metaTags.keywordsFishMeta} ${productDetail.product.title}, 
                рыба ${productDetail.product.title}, рыба ${productDetail.product.title} купить`,
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
                    {
                        label: "Разновидность",
                        name: productDetail.fishTypeName,
                    },
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
            redirectUrl="/products/fish"
        />
    );
};

export default FishDetail;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ res }) => {
        const props: IFishDetailProps = {
            product: {},
            metaTags: {
                titleFishMeta: "Вкусная рыба",
                descFishMeta: "Большой ассортимент рыбы в лучшем баре Калуги Пивградъ. Купите рыбу по отличной цене.",
                keywordsFishMeta: "рыба, рыба в Калуге, купить рыбу в Калуге, купить рыбу, вкусная рыба, копченая рыба, купить копченую рыбу, купить копченую рыбу в Калуге, купить рыбу к пиву, купить рыбу к пиву в Калуге",
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
