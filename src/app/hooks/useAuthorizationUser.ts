import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { removeMask } from "../helpers/stringHelper";
import { basketApi } from "../store/services/basket/basket.api";
import { checkUserNotExistByEmailAndPhone, checkUserExistByPhone, loginByCode, sendCodeByCall, registrate, login } from "../store/services/users/reducers/user.slice";
import { ILogin, IRegistration, ISendCodeByCallResponse } from "../store/services/users/types/auth.types";
import { useActions } from "./useActions";
import { useBasket } from "./useBasket";

export const useAuthorizationUser = () => {
    const { setLoginPhone, setPhone, switchVerificationForm, setMinutesResend, setSecondsResend, switchLoginForm, setCanResendCode, resetRegFields } = useActions();
    const dispatch = useDispatch();
    const { getBasketByUser } = useBasket();

    const sendCode = async (phone: string): Promise<boolean> => {
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

        setCanResendCode({resendCode: false});
        switchVerificationForm();
        return true;
    }

    const registrateUser = async (userData: IRegistration) => {
        const result = await dispatch(checkUserNotExistByEmailAndPhone({
            email: userData.email, 
            phone: userData.phone
        }));

        const isUserNotExist = unwrapResult(result);
        if (isUserNotExist.result) {
            await setPhone({phone: userData.phone});
            const result = await sendCode(userData.phone);
            if (result) {
                await dispatch(registrate(userData));
                resetRegFields();
                setLoginPhone({phone: userData.phone});
            }
        }
    }

    const authByCodeStepSendCode = async (phone: string) => {
        let isUserExist = await dispatch(checkUserExistByPhone(phone));
        if (!isUserExist.error) {
            await setLoginPhone({phone});
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
            getBasketByUser();
        }
    }

    return { sendCode, registrateUser, authByCodeStepSendCode, authByCodeStepLogin, loginUser };
}