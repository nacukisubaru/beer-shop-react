import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useBasket } from "../../hooks/useBasket";
import { checkUserExistByPhone, login, sendCodeByCall } from "../../store/services/users/reducers/user.slice";
import { ILogin, ISendCodeByCallResponse } from "../../store/services/users/types/auth.types";
import LoginView from "./LoginView";

export default function LoginContainer() {
    const dispatch = useDispatch();
    const {getBasketByUser} = useBasket();
    const {setPhone, switchVerificationForm, setMinutesResend, setSecondsResend} = useActions();
    const authError = useAppSelector(state => state.userReducer.error);

    const loginUser = async (post: ILogin) => {
        const data = await dispatch(login(post));
        if(data.payload.user) {
            getBasketByUser(data.payload.user.id);
        }
    }

    const setPhoneAndOpenVerificationForm = async (phone: string) => {
        let isUserExist = await dispatch(checkUserExistByPhone(phone));
        if(!isUserExist.error) { 
            await setPhone({phone});
            const res = await dispatch(sendCodeByCall(phone));
            const data: ISendCodeByCallResponse = unwrapResult(res);
            if(data.status == "ERROR_LIMIT_TIME") {
                const {minutes, seconds} = data.remainingTime;
                setSecondsResend({seconds});
                setMinutesResend({minutes});
            }
            if(data.status !== "ERROR") {
                switchVerificationForm();
            }
        }
    }

    return (<>
        <LoginView login={loginUser} loginByCode={setPhoneAndOpenVerificationForm} error={authError}></LoginView>
    </>);
}