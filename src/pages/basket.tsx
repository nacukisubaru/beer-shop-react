import { GetServerSideProps } from "next";
import React from "react";
import BasketContainer from "../app/components/Basket/BasketContainer";
import Menu from "../app/components/Drawer/Menu/Menu";
import { fetchArticlesList, fetchHeaderData, fetchPhonesList, fetchSocialNetworks } from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";

export default function Basket() {
    return (
        <>
            <div className="page-container">
                <Menu callbackApplyFilter={()=>{}} callbackResetFilter={()=>{}} filter={{minPrice: 0, maxPrice: 0, productType: ''}} filterList={[]}/>
                <BasketContainer />
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());
    })