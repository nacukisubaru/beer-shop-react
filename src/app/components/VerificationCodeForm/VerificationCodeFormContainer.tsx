import { FC } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import {
    sendCodeByCall,
} from "../../store/services/users/reducers/user.slice";
import VerificationCodeFormView from "./VerificationCodeFormView";

interface VerificationCodeFormContainer {}

const VerificationCodeFormContainer: FC<VerificationCodeFormContainer> = () => {
    const { setMinutesResend, setSecondsResend, setCanResendCode } = useActions();
    const { phone } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const {error} = useAppSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const {authByCodeStepLogin} = useAuthorizationUser();

    const handlerLoginByCode = async (code: string) => {
        authByCodeStepLogin(phone, code);
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
