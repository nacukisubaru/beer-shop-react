import { FC } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
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

    let verificationError = "";
    const dispatch = useDispatch();
    const handlerLoginByCode = (code: string) => {
        dispatch(loginByCode({ phone, code }));
    };

    const handlerRequestCode = () => {
        dispatch(sendCodeByCall({ phone }));
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
