import { unwrapResult } from "@reduxjs/toolkit";
import { FC } from "react";
import { useDispatch } from "react-redux";
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
    const { setMinutesResend, setSecondsResend, setCanResendCode } = useActions();
    const { phone } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const {getBasketByUser} = useBasket();
    let verificationError = "";
    const dispatch = useDispatch();
    const handlerLoginByCode = async (code: string) => {
        let userData = await dispatch(loginByCode({ phone, code }));
        userData = unwrapResult(userData);
        getBasketByUser(userData.user.id);
    };

    const handlerRequestCode = () => {
        dispatch(sendCodeByCall(phone));
        setMinutesResend({minutes: 4});
        setSecondsResend({seconds: 59});
        setCanResendCode({resendCode: false});
    };

    return (
        <VerificationCodeFormView
            requestCode={handlerRequestCode}
            login={handlerLoginByCode}
            error={verificationError}
        />
    );
};

export default VerificationCodeFormContainer;
