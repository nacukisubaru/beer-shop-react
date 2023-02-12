import { useRouter } from "next/router";
import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import VerificationCodeFormView from "./VerificationCodeFormView";

const VerificationCodeFormContainer: FC = () => {
    const router = useRouter();
    const { setMinutesResend, setSecondsResend, setCanResendCode, switchLoginForm, clearUserErrors } = useActions();
    const { loginPhone } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const {error} = useAppSelector((state) => state.userReducer);
    const {backRedirectToOrder} = useAppSelector(state => state.orderReducer);
    const {authByCodeStepLogin, sendCode} = useAuthorizationUser();

    const handlerLoginByCode = async (code: string) => {
        await authByCodeStepLogin(loginPhone, code);
        if(backRedirectToOrder) {
            router.replace("/basket");
        }
    };

    const handlerRequestCode = () => {
        sendCode(loginPhone, false);
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
