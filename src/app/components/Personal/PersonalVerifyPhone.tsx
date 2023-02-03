import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import { sendCodeByCall } from "../../store/services/users/reducers/user.slice";
import VerificationCodeForm from "../VerificationCodeForm/VerificationCodeForm";
import BasicModal from "../Modals/BasicModal";
import styles from "./styles/profile.module.css";

interface IModalProps {
    title: string;
    open: boolean;
    setClose: () => void;
}

interface IVerifyProps {
    phoneNumber?: string;
    verifyNewPhone: boolean
    verifyAction: () => void;
}

interface IPersonalVerifyPhone {
    modalProps: IModalProps;
    verifyProps: IVerifyProps;
}

const PersonalVerifyPhone: FC<IPersonalVerifyPhone> = ({ modalProps, verifyProps }) => {
    const {open, title, setClose} = modalProps;
    const {phoneNumber, verifyNewPhone, verifyAction} = verifyProps;
    const { user, error, isVerifyPhone } = useAppSelector(state => state.userReducer);
    const { isNewPhoneVerify, errorPhoneVerify } = useAppSelector(state => state.verificationCodeReducer);
    const { setMinutesResend, setSecondsResend, setCanResendCode } = useActions();
    const dispatch = useDispatch();
    const { verifyBySmsCode, verifyPhone } = useAuthorizationUser();
    const [verifyError, setVerifyError] = useState("");

    useEffect(() => {
        if (isVerifyPhone) { 
            setClose();
            verifyAction();
            setVerifyError("");
        }
    }, [isVerifyPhone]);

    useEffect(() => {
        if (isNewPhoneVerify) {
            setClose();
            verifyAction();
            setVerifyError("");
        }
    }, [isNewPhoneVerify])

    useEffect(() => {
        if (errorPhoneVerify) {
            setVerifyError(errorPhoneVerify);
        }
    }, [errorPhoneVerify])

    useEffect(() => {
        console.log({error});
        if (error.message) {
            setVerifyError(error.message);
        }
    }, [error]);

    const getPhone = () => {
        let phone = user.phone;
        if (phoneNumber) {
            phone = phoneNumber;
        }
        return phone;
    }

    const handlerRequestCode = () => {
        const phone = getPhone();
        dispatch(sendCodeByCall(phone));
        setSecondsResend({seconds: 59});
        setMinutesResend({minutes: 1});
        setCanResendCode({resendCode: false});
    };

    const handlerVerify = async (code: string) => {
        const phone = getPhone();
        if (verifyNewPhone) {
            await verifyPhone(phone, code);
        } else {
            await verifyBySmsCode(phone, code);
        }
    }

    useEffect(() => {
        setCanResendCode({resendCode: true});
    }, []);

    return (
        <>
            <BasicModal
                open={open}
                body={
                    <div className={styles.verifyModal}>
                        <VerificationCodeForm
                            requestCode={handlerRequestCode}
                            login={handlerVerify}
                            error={verifyError}
                            nameBtn="Подтвердить"
                        />
                    </div>
                }
                title={title}
                showOkBtn={false}
                width={"xs"}
                setClose={setClose}
            />
        </>
    );
};

export default PersonalVerifyPhone;
