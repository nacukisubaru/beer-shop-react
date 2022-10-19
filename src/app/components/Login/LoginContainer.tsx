import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useBasket } from "../../hooks/useBasket";
import { login, sendCodeByCall } from "../../store/services/users/reducers/user.slice";
import { ILogin } from "../../store/services/users/types/auth.types";
import LoginView from "./LoginView";

export default function LoginContainer() {
    const dispatch = useDispatch();
    const {getBasketByUser} = useBasket();
    const {setPhone, switchVerificationForm} = useActions();
    const authError = useAppSelector(state => state.userReducer.error);
    
    const loginUser = async (post: ILogin) => {
        const data = await dispatch(login(post));
        if(data.payload.user) {
            getBasketByUser(data.payload.user.id);
        }
    }

    const setPhoneAndOpenVerificationForm = async (phone: string) => {
        await setPhone({phone});
        const res = await dispatch(sendCodeByCall(phone));
        const data = unwrapResult(res);
        if(data.status !== "ERROR") {
            switchVerificationForm();
        }
    }

    return (<>
        <LoginView login={loginUser} loginByCode={setPhoneAndOpenVerificationForm} error={authError}></LoginView>
    </>);
}