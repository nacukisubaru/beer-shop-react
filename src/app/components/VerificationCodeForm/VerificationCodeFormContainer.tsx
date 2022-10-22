import { FC } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import {
    sendCodeByCall,
} from "../../store/services/users/reducers/user.slice";
import VerificationCodeFormView from "./VerificationCodeFormView";

const VerificationCodeFormContainer: FC = () => {
    const { setMinutesResend, setSecondsResend, setCanResendCode, switchLoginForm, clearUserErrors } = useActions();
    const { phone, loginPhone } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const {lastestForm} = useAppSelector((state) => state.accountFormsReducer);
    const {error} = useAppSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const {authByCodeStepLogin} = useAuthorizationUser();

    const handlerLoginByCode = async (code: string) => {
        const phoneNumber = lastestForm === "login" ? loginPhone : phone;
        authByCodeStepLogin(phoneNumber, code);
    };

    const handlerRequestCode = () => {
        const phoneNumber = lastestForm === "login" ? loginPhone : phone;
        dispatch(sendCodeByCall(phoneNumber));
        setSecondsResend({seconds: 59});
        setMinutesResend({minutes: 1});
        setCanResendCode({resendCode: false});
    };

    const handlerBackToAuthorize = () => {
        clearUserErrors();
        switchLoginForm();
    }

    return (
        <VerificationCodeFormView
            requestCode={handlerRequestCode}
            login={handlerLoginByCode}
            back={handlerBackToAuthorize}
            error={error.message}
        />
    );
};

export default VerificationCodeFormContainer;
