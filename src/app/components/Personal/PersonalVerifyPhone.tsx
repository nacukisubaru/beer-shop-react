import { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
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
    const { user, isVerifyPhone } = useAppSelector(state => state.userReducer);
    const { setMinutesResend, setSecondsResend, setCanResendCode } = useActions();
    const { verifyBySmsCode, verifyPhone, clearUserErrorMessage, sendCode, errorMessage } = useAuthorizationUser();

    useEffect(() => {
        if (isVerifyPhone) {
            setClose();
            verifyAction();
        }
    }, [isVerifyPhone]);

    const getPhone = () => {
        let phone = user.phone;
        if (phoneNumber) {
            phone = phoneNumber;
        }
        return phone;
    }

    const handlerRequestCode = () => {
        const phone = getPhone();
        sendCode(phone, false);
        setSecondsResend({seconds: 59});
        setMinutesResend({minutes: 1});
        setCanResendCode({resendCode: false});
    };

    const handlerVerify = async (code: string) => {
        await clearUserErrorMessage();
        const phone = getPhone();
        if (verifyNewPhone) {
            await verifyPhone(phone, code);
        } else {
            await verifyBySmsCode(phone, code);
        }
    }

    const handleClose = () => {
        setClose();
        clearUserErrorMessage();
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
                            error={errorMessage}
                            nameBtn="Подтвердить"
                        />
                    </div>
                }
                title={title}
                showOkBtn={false}
                width={"xs"}
                setClose={handleClose}
            />
        </>
    );
};

export default PersonalVerifyPhone;
