import { GetServerSideProps } from "next";
import React from "react";
import BasketContainer from "../app/components/Basket/BasketContainer";
import Menu from "../app/components/Drawer/Menu/Menu";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import { fetchArticlesList, fetchHeaderData, fetchPhonesList, fetchSocialNetworks } from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";

export default function Basket({ data }) {
    return (
        <>
            <div className="page-container">
                <Menu callbackApplyFilter={()=>{}} callbackResetFilter={()=>{}} filter={{minPrice: 0, maxPrice: 0, productType: ''}} filterList={[]}/>
                <BasketContainer consentText={data.text && data.text}/>
            </div>
        </>
    );
}

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