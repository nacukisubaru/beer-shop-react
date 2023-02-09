import { FC, useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import InputMask from "react-input-mask";
import PersonalVerifyPhone from "./PersonalVerifyPhone";
import BasicModal from "../Modals/BasicModal";
import styles from "./styles/profile.module.css";
import {
    changePhone,
    checkUserNotExistByPhone,
} from "../../store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
import CustomSnackBar from "../CustomUI/CustomSnackBar/CustomSnackBar";

interface IModalProps {
    open: boolean;
    setClose: () => void;
}

interface IPersonalChangePhone {
    modalProps: IModalProps;
}

const PersonalChangePhone: FC<IPersonalChangePhone> = ({ modalProps }) => {
    const dispatch = useDispatch();

    const { open, setClose } = modalProps;
    const { changePhoneState, setNewPhoneVerify } = useActions();
    const { sendCode, clearUserErrorMessage, errorMessage } = useAuthorizationUser();
    const { isNewPhoneVerify } = useAppSelector(state => state.userReducer);

    const [phoneNumber, setPhone] = useState("");
    const [isOpenVerifyModal, openVerifyModal] = useState(false);
    const [isOpenSuccessMess, openSuccessMessage] = useState(false);

    const handlerSetPhone = (event: any) => {
        setPhone(event.target.value);
    };

    const handlerRequestCode = async (event: any) => {
        event.preventDefault();
        const result = await dispatch(checkUserNotExistByPhone(phoneNumber));
        if (!result.error) {
            const isSent = await sendCode(phoneNumber, false);
            if (isSent) {
                setClose();
                openVerifyModal(true);
                clearUserErrorMessage();
            }
        }
    };

    const handlerCloseVerify = () => {
        openVerifyModal(false);
    };

    const changePhoneNumber = async () => {
        await dispatch(changePhone(phoneNumber));
        await changePhoneState({ phone: phoneNumber });
        setPhone("");
        openSuccessMessage(true);
        setNewPhoneVerify({isVerify: false})
    };

    const handlerCloseSuccessMes = () => {
        openSuccessMessage(false);
    }

    useEffect(() => {
        if (isNewPhoneVerify) {
            openVerifyModal(false);
            changePhoneNumber();
        }
    }, [isNewPhoneVerify])

    return (
        <>
            <BasicModal
                open={open}
                body={
                    <div className={styles.verifyModal}>
                        <form>
                            <InputMask
                                mask="+7 (999) 99 99 999"
                                value={phoneNumber}
                                onChange={handlerSetPhone}
                            >
                                <TextField
                                    fullWidth
                                    id="outlined-required"
                                    label="Номер телефона"
                                    type="text"
                                    style={{ marginBottom: "10px" }}
                                />
                            </InputMask>
                            {errorMessage && (
                                <Typography style={{ color: "red" }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                style={{ width: "316px", marginBottom: "10px" }}
                                type="submit"
                                onClick={handlerRequestCode}
                            >
                                Запросить код
                            </Button>
                        </form>
                    </div>
                }
                title="Изменение номера телефона"
                showOkBtn={false}
                width={"xs"}
                setClose={setClose}
            />
            <PersonalVerifyPhone
                verifyProps={{
                    phoneNumber,
                    verifyNewPhone: true,
                    verifyAction: ()=>{},
                }}
                modalProps={{
                    title: "Изменение номера телефона",
                    open: isOpenVerifyModal,
                    setClose: handlerCloseVerify,
                }}
            />
            <CustomSnackBar
                severity="success"
                message="Ваш номер телефона успешно изменён"
                isOpen={isOpenSuccessMess}
                onClose={handlerCloseSuccessMes}
            />
        </>
    );
};

export default PersonalChangePhone;
