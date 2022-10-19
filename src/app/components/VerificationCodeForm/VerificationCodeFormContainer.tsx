import { unwrapResult } from "@reduxjs/toolkit";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { removeMask } from "../../helpers/stringHelper";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useBasket } from "../../hooks/useBasket";
import {
    loginByCode,
    sendCodeByCall,
} from "../../store/services/users/reducers/user.slice";
import VerificationCodeFormView from "./VerificationCodeFormView";

interface VerificationCodeFormContainer {}

const VerificationCodeFormContainer: FC<VerificationCodeFormContainer> = () => {
    const { setMinutesResend, setSecondsResend, setCanResendCode, switchLoginForm } = useActions();
    const { phone } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const {error} = useAppSelector((state) => state.userReducer);
    const {getBasketByUser} = useBasket();
    const dispatch = useDispatch();

    const handlerLoginByCode = async (code: string) => {
        code = removeMask(code);
        let userData = await dispatch(loginByCode({ phone, code }));
        userData = unwrapResult(userData);
        getBasketByUser(userData.user.id);
        switchLoginForm();
    };

    const handlerRequestCode = () => {
        dispatch(sendCodeByCall(phone));
        setSecondsResend({seconds: 59});
        setMinutesResend({minutes: 1});
        setCanResendCode({resendCode: false});
    };

    return (
        <VerificationCodeFormView
            requestCode={handlerRequestCode}
            login={handlerLoginByCode}
            error={error.message}
        />
    );
};

export default VerificationCodeFormContainer;
