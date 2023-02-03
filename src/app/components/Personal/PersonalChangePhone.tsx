import { FC, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import InputMask from "react-input-mask";
import PersonalVerifyPhone from "./PersonalVerifyPhone";
import BasicModal from "../Modals/BasicModal";
import styles from "./styles/profile.module.css";

interface IModalProps {
    open: boolean,
    setClose: () => void
}

interface IPersonalChangePhone {
    modalProps: IModalProps,
}

const PersonalChangePhone: FC<IPersonalChangePhone> = ({modalProps}) => {
    const { open, setClose } = modalProps;

    const [phoneNumber, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [isOpenVerifyModal, openVerifyModal] = useState(false);
    const {sendCode} = useAuthorizationUser();

    const handlerSetPhone = (event: any) => {
        setPhone(event.target.value);
    };

    const handlerRequestCode = async (event:any) => {
        event.preventDefault();
        //todo проверить телефон что пользователь не зарегистрирован
        const isSent = await sendCode(phoneNumber, false);
        if (isSent) {
            setClose();
            openVerifyModal(true);
            setPhoneError("");
        } else {
            setPhoneError("Неверно указан номер телефона");
        }
    }

    const handlerCloseVerify = () => {
        openVerifyModal(false);
    }

    const changePhoneNumber = () => {
        //todo отправляем запрос на изменение номера телефона
    }

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
                        {phoneError && (
                            <Typography>
                                {phoneError}
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
                verifyAction: changePhoneNumber
            }}
            modalProps={{
                title: "Изменение номера телефона",
                open: isOpenVerifyModal,
                setClose: handlerCloseVerify
            }}
        />
        </>
    );
};

export default PersonalChangePhone;
