import React from "react";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import Header from "../../app/components/Header/Header";
import Menu from "../../app/components/Drawer/Menu/Menu";
import ProfileView from "../../app/components/Profile/ProfileView";
import LoginAndRegistrationForm from "../../app/components/Login/LoginAndRegForm";
import VerificationCodeFormContainer from "../../app/components/VerificationCodeForm/VerificationCodeFormContainer";

export default function Account() {
    const { isAuth } = useAppSelector((state) => state.userReducer);
    const { isVerificationCodeForm } = useAppSelector(
        (state) => state.accountFormsReducer
    );
    return (
        <>
            <Header />
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
