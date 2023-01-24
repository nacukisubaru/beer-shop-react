import React from "react";
import { useAppSelector } from "../app/hooks/useAppSelector";
import Menu from "../app/components/Drawer/Menu/Menu";
import ProfileView from "../app/components/Profile/ProfileView";
import LoginAndRegistrationForm from "../app/components/Login/LoginAndRegForm";
import VerificationCodeFormContainer from "../app/components/VerificationCodeForm/VerificationCodeFormContainer";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";
import { GetServerSideProps } from "next";

export default function Account() {
    const { isAuth } = useAppSelector((state) => state.userReducer);
    const { isVerificationCodeForm } = useAppSelector(
        (state) => state.accountFormsReducer
    );
    return (
        <>
            <Menu
                callbackApplyFilter={() => {}}
                callbackResetFilter={() => {}}
                filter={{ minPrice: 0, maxPrice: 0, productType: "" }}
                filterList={[]}
            />
            {isAuth ? (
                <ProfileView />
            ) : isVerificationCodeForm ? (
                <VerificationCodeFormContainer />
            ) : (
                <LoginAndRegistrationForm />
            )}
        </>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());
    });
