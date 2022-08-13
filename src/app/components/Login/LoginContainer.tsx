import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useBasket } from "../../hooks/useBasket";
import { ILogin } from "../../store/services/users/types/auth.types";
import { userApi } from "../../store/services/users/users.api";
import LoginView from "./LoginView";

export default function LoginContainer() {
    const [login] = userApi.useLoginMutation();
    const {
        addUserDataWithStorage, 
        addAuthError, 
        resetAuthError, switchRegForm} = useActions();

    const {getBasketByUser} = useBasket();

    const authError = useAppSelector(state => state.userReducer.authError);

    const loginUser = async (post: ILogin) => {
        try {
            const data = await login(post).unwrap();
            addUserDataWithStorage(data);
            resetAuthError();
            getBasketByUser(data.user.id);
        } catch(e: any) {
            addAuthError({status: e.status, message: e.data.message});
        }
    }

    return (<>
        <LoginView login={loginUser} switchRegForm={switchRegForm} error={authError}></LoginView>
    </>);
}