import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ILogin } from "../../store/services/users/types/auth.types";
import { userApi } from "../../store/services/users/users.api";
import LoginView from "./LoginView";

export default function LoginContainer() {
    const [login] = userApi.useLoginMutation();
    const {
        addUserData, 
        addAuthError, 
        resetAuthError, switchRegForm} = useActions();

    const authError = useAppSelector(state => state.userReducer.authError);

    const loginUser = async (post: ILogin) => {
        try {
            const data = await login(post).unwrap();
            addUserData(data);
            resetAuthError();
        } catch(e: any) {
            addAuthError({status: e.status, message: e.data.message});
        }
    }

    return (<>
        <LoginView login={loginUser} switchRegForm={switchRegForm} error={authError}></LoginView>
    </>);
}