import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import React from "react";
import LoginView from "./LoginView";
import { useActions } from "../../hooks/useActions";

export default function LoginContainer() {
    const {authByCodeStepSendCode, loginUser} = useAuthorizationUser();
    const {setLoginPhone} = useActions();
    const authError = useAppSelector(state => state.userReducer.error);
    const {loginPhone} = useAppSelector(state => state.verificationCodeReducer);

    const setPhone = (phone: string) => {
        setLoginPhone({phone});
    }

    return (<>
        <LoginView login={loginUser} loginByCode={authByCodeStepSendCode} setLoginPhone={setPhone} phone={loginPhone} error={authError}></LoginView>
    </>);
}