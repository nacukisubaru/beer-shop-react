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
    const {getBasketByUser} = useBasket();
    const authError = useAppSelector(state => state.userReducer.error);

    const loginUser = async (post: ILogin) => {
        const data = await dispatch(login(post));
        if(data.payload.user) {
            getBasketByUser(data.payload.user.id);
        }
    }

    return (<>
        <LoginView login={loginUser} error={authError}></LoginView>
    </>);
}