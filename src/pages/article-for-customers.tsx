import HTMLReactParser from "html-react-parser";
import { GetServerSideProps } from "next";
import Menu from "../app/components/Drawer/Menu/Menu";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import { decodeHtml } from "../app/helpers/stringHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";
import Head from "next/head";
import { FC } from "react";

interface ArticleForCustomersProps {
    data: any
}

const ArticleForCustomers: FC<ArticleForCustomersProps> = ({ data }) => {
    return (
        <>
            <Head>
                <title>Информация для клиента | Пивградъ</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <Menu
                filterList={[]}
                productType="beers"
            />
            <div className="wrapper">
                {data.text && HTMLReactParser(decodeHtml(data.text))}
            </div>
        </>
    );
};

export default ArticleForCustomers;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: any = {
            data: {},
        };

        const { id } = query;
        const article = await cmsQueryExecute(
            `/api/articles-for-customers/${id}`
        );
        if (article) {
            props.data.text = article.text;
        }

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        return {
            props,
        };
    });
