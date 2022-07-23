import React from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { IAuth, ILogin } from "../../store/services/users/types/auth.types";
import { userApi } from "../../store/services/users/users.api";
import LoginView from "./LoginView";

export default function LoginContainer() {
    const [login, { isLoading}] = userApi.useLoginMutation();
    const {addUserData} = useActions();

    const loginUser = async (post: ILogin) => {
        const data = await login(post).unwrap();
        addUserData(data);
    }

    return (<>
        <LoginView login={loginUser}></LoginView>
    </>);
}