import React from "react";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import Menu from "../../app/components/Drawer/Menu/Menu";
import PersonalAccount from "../../app/components/Personal/PersonalAccount";
import LoginAndRegistrationForm from "../../app/components/Login/LoginAndRegForm";
import VerificationCodeFormContainer from "../../app/components/VerificationCodeForm/VerificationCodeFormContainer";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../app/store/reducers/header.slice";
import { wrapper } from "../../app/store/store";
import { GetServerSideProps } from "next";
import { cmsQueryExecute } from "../../app/helpers/cmsHelper";
import Head from "next/head";

export default function Account({data}) {
    const { isAuth } = useAppSelector((state) => state.userReducer);
    const { isVerificationCodeForm } = useAppSelector(
        (state) => state.accountFormsReducer
    );
    return (
        <>
            <Head>
                <title>{ isAuth ? 'Личный кабинет | Пивградъ' : 'Авторизация | Пивградъ' }</title>
            </Head>
            <Menu
                filterList={[]}
                productType="beers"
            />
            {isAuth ? (
                <PersonalAccount />
            ) : isVerificationCodeForm ? (
                <VerificationCodeFormContainer />
            ) : (
                <LoginAndRegistrationForm consentText={data.text && data.text} />
            )}
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
