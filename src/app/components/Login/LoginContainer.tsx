import React from "react";
import LoginView from "./LoginView";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useBasket } from "../../hooks/useBasket";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import { login } from "../../store/services/users/reducers/user.slice";
import { ILogin } from "../../store/services/users/types/auth.types";

export default function LoginContainer() {
    const dispatch = useDispatch();
    const {getBasketByUser} = useBasket();
    const authError = useAppSelector(state => state.userReducer.error);
    const {authByCodeStepSendCode} = useAuthorizationUser();
    const loginUser = async (post: ILogin) => {
        const data = await dispatch(login(post));
        if(data.payload.user) {
            getBasketByUser(data.payload.user.id);
        }
    }

    return (<>
        <LoginView login={loginUser} loginByCode={authByCodeStepSendCode} error={authError}></LoginView>
    </>);
}