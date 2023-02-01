import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../../hooks/useAuthorizationUser";
import { sendCodeByCall } from "../../../store/services/users/reducers/user.slice";
import VerificationCodeForm from "../../VerificationCodeForm/VerificationCodeForm";
import BasicModal from "../BasicModal";
import styles from "../styles/modal.module.css";

interface IModalProps {
    title: string;
    open: boolean;
    setClose: () => void;
}

interface IVerifyPhoneModal {
    modalProps: IModalProps;
    phoneNumber?: string;
}

const VerifyPhoneModal: FC<IVerifyPhoneModal> = ({ phoneNumber, modalProps }) => {
    const {open, title,  setClose} = modalProps;
    const { user, error } = useAppSelector(state => state.userReducer);
    const { setMinutesResend, setSecondsResend, setCanResendCode } = useActions();
    const dispatch = useDispatch();
    const { verifyBySmsCode } = useAuthorizationUser();

    const getPhone = () => {
        let phone = user.phone;
        if (phoneNumber) {
            phone = phoneNumber;
        }
        return phone;
    }
console.log({error});
    const handlerRequestCode = () => {
        const phone = getPhone();
        dispatch(sendCodeByCall(phone));
        setSecondsResend({seconds: 59});
        setMinutesResend({minutes: 1});
        setCanResendCode({resendCode: false});
    };

    const handlerVerify = (code: string) => {
        const phone = getPhone();
        verifyBySmsCode(phone, code);
    }

    useEffect(() => {
        setCanResendCode({resendCode: true});
    }, []);

    return (
        <BasicModal
            open={open}
            body={
                <div className={styles.verifyModal}>
                    <VerificationCodeForm
                        requestCode={handlerRequestCode}
                        login={handlerVerify}
                        error={error.message}
                        nameBtn="Подтвердить"
                    />
                </div>
            }
            title={title}
            showOkBtn={false}
            width={"xs"}
            setClose={setClose}
        />
    );
};

export default VerifyPhoneModal;
