import React from "react";
import LoginContainer from "../../app/components/Login/LoginContainer";
import RegistrationContainer from "../../app/components/Registration/RegistrationContainer";
import { useAppSelector } from "../../app/hooks/useAppSelector";

export default function Account() {
    const accountForm = useAppSelector((state) => state.accountFormsReducer);

    return (
        <>
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
