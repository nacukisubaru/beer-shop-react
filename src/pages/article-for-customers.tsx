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

const ArticleForCustomers = ({ data }) => {
    return <>
        <Menu
            callbackApplyFilter={() => {}}
            callbackResetFilter={() => {}}
            filter={{ minPrice: 0, maxPrice: 0, productType: "" }}
            filterList={[]}
        />
        {data.text && HTMLReactParser(decodeHtml(data.text))}
    </>;
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
