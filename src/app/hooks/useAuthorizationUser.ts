import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeMask } from "../helpers/stringHelper";
import { checkUserExistByPhone, loginByCode, sendCodeByCall, registrate, login, verifyUserBySmsCode, verifyPhoneByCode, checkUserNotExistByPhone } from "../store/services/users/reducers/user.slice";
import { ILogin, IRegistration, ISendCodeByCallResponse } from "../store/services/users/types/auth.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { useBasket } from "./useBasket";

export const useAuthorizationUser = () => {
    const { 
        setLoginPhone, setPhone, 
        switchVerificationForm, 
        setMinutesResend, setSecondsResend, 
        switchLoginForm, setCanResendCode, 
        resetRegFields, setRegisteredNow } = useActions();
    const dispatch = useDispatch();
    const { getBasketByUser } = useBasket();
    const router = useRouter();

    const { backRedirectToOrder } = useAppSelector(state => state.orderReducer);
    const { user, error } = useAppSelector((state) => state.userReducer);
    const [errorMessage, setErrorMessage] = useState("");
    const { clearUserErrors } = useActions();

    useEffect(() => {
        if (error.message) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("");
        }
    }, [error]);

    const clearUserErrorMessage = async () => {
        clearUserErrors();
    }

    const sendCode = async (phone: string, switchVerifyForm: boolean = true): Promise<boolean> => {
        await setSecondsResend({ seconds: 59 });
        await setMinutesResend({ minutes: 1 });

        const res = await dispatch(sendCodeByCall(phone));
        const data: ISendCodeByCallResponse = unwrapResult(res);
        if (data.status === "ERROR") {
            return false;
        }

        if (data.status === "ERROR_LIMIT_TIME") {
            const { minutes, seconds } = data.remainingTime;
            setSecondsResend({ seconds });
            setMinutesResend({ minutes });
        }

        setCanResendCode({ resendCode: false });
        if (switchVerifyForm) {
            switchVerificationForm();
        }
        return true;
    }

    const registrateUser = async (userData: IRegistration) => {

        const result = await dispatch(checkUserNotExistByPhone(
            userData.phone
        ));

        const isUserNotExist = unwrapResult(result);
        if (isUserNotExist) {
            await setPhone({ phone: userData.phone });
            const result = await sendCode(userData.phone);
            if (result) {
                await dispatch(registrate(userData));
                resetRegFields();
                setLoginPhone({ phone: userData.phone });
            }
        }
    }

    const authByCodeStepSendCode = async (phone: string) => {
        let isUserExist = await dispatch(checkUserExistByPhone(phone));
        if (!isUserExist.error) {
            await setLoginPhone({ phone });
            sendCode(phone);
        }
    }

    const authByCodeStepLogin = async (phone: string, code: string) => {
        code = removeMask(code);
        let userData = await dispatch(loginByCode({ phone, code }));
        userData = unwrapResult(userData);
        getBasketByUser();
        switchLoginForm();
    }

    const loginUser = async (post: ILogin) => {
        const data = await dispatch(login(post));
        if (data.payload.user) {
            await getBasketByUser();
            await setRegisteredNow({ isReg: false });
            if (backRedirectToOrder) {
                router.replace('/basket');
            }
        }
    }

    const checkRoleUser = (roleValue: string) => {
        return user.roles.some((role) => role.value === roleValue);
    }

    const verifyBySmsCode = async (phone: string, code: string) => {
        code = code.replace(/\s/g, '');
        await dispatch(verifyUserBySmsCode({ phone, code }));
    }

    const verifyPhone = (phone: string, code: string) => {
        code = code.replace(/\s/g, '');
        dispatch(verifyPhoneByCode({ phone, code }));
    }

    return {
        sendCode,
        registrateUser,
        authByCodeStepSendCode,
        authByCodeStepLogin,
        verifyBySmsCode,
        verifyPhone,
        loginUser,
        checkRoleUser,
        clearUserErrorMessage,
        errorMessage
    };
}