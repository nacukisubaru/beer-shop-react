import React from "react";
import LoginContainer from "../../app/components/Login/LoginContainer";
import RegistrationContainer from "../../app/components/Registration/RegistrationContainer";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import Header from "../../app/components/Header/Header";
import Menu from "../../app/components/Drawer/Menu/Menu";

export default function Account() {
    const accountForm = useAppSelector((state) => state.accountFormsReducer);

    return (
        <>
            <Header />
            <Menu
               callbackApplyFilter={()=>{}} 
               callbackResetFilter={()=>{}}
            />
            {accountForm.isLoginForm ? (
                <LoginContainer />
            ) : accountForm.isRegistrationForm ? (
                <RegistrationContainer />
            ) : (
                <LoginContainer />
            )}
        </>
    );
}
