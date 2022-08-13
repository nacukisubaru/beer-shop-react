import React from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useBasket } from "../../hooks/useBasket";
import { login } from "../../store/services/users/reducers/user.slice";
import { ILogin } from "../../store/services/users/types/auth.types";
import LoginView from "./LoginView";

export default function LoginContainer() {
    const dispatch = useDispatch();
    const {
        addAuthError, 
        resetAuthError, switchRegForm} = useActions();

    const {getBasketByUser} = useBasket();

    const authError = useAppSelector(state => state.userReducer.authError);
    const {user} = useAppSelector(state => state.userReducer);

    const loginUser = async (post: ILogin) => {
        try {
            await dispatch(login(post));      
            await resetAuthError();
            getBasketByUser(user.id);
        } catch(e: any) {
            addAuthError({status: e.status, message: e.data.message});
        }
    }

    return (<>
        <LoginView login={loginUser} switchRegForm={switchRegForm} error={authError}></LoginView>
    </>);
}