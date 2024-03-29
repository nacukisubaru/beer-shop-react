import { GetServerSideProps } from "next";
import React, { FC } from "react";
import BasketContainer from "../app/components/Basket/BasketContainer";
import Menu from "../app/components/Drawer/Menu/Menu";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import { fetchArticlesList, fetchHeaderData, fetchPhonesList, fetchSocialNetworks } from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";
import Head from "next/head";

interface BasketProps {
    data: any
}

const Basket: FC<BasketProps> = ({ data }) => {
    return (
        <>
            <Head>
                <title>Корзина | Пивградъ</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <div className="page-container">
                <Menu
                    filterList={[]}
                    productType="beers"
                />
                <BasketContainer consentText={data.text && data.text}/>
            </div>
        </>
    );
}

export default Basket;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: any = {
            data: {
            }
        };

        const consentData = await cmsQueryExecute('/api/consent');
        if (consentData) {
            props.data.text = consentData.text;
        }

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        
        return { props };
    });