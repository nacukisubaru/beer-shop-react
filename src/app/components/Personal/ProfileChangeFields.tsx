import { Button, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { emailPattern } from "../../helpers/validationHelper";
import { useActions } from "../../hooks/useActions";
import {
    changeEmail,
    changeFio,
    changePassword,
} from "../../store/services/users/reducers/user.slice";
import CustomSnackBar from "../CustomUI/CustomSnackBar/CustomSnackBar";
import BasicModal from "../Modals/BasicModal";
import styles from "./styles/profile.module.css";

type fieldType = "email" | "фио" | "пароль";

interface IModalProps {
    open: boolean;
    setSuccessOpen: (isOpen: boolean) => void;
    setClose: () => void;
}

interface IChangeFieldsProps {
    field: fieldType;
    currentValue: string;
}

interface IProfileChangeFields {
    modalProps: IModalProps;
    changeFieldsProps: IChangeFieldsProps;
}

const ProfileChangeFields: FC<IProfileChangeFields> = ({
    modalProps,
    changeFieldsProps,
}) => {
    const { open, setClose, setSuccessOpen } = modalProps;
    const { field, currentValue } = changeFieldsProps;
    const { changeEmailState, changeFioState } = useActions();

    const [fieldValue, setFieldValue] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useDispatch();

    const handlerSetValue = (event: any) => {
        setFieldValue(event.target.value);
    };

    const handlerSetRepeatPasswordValue = (event: any) => {
        setPassword(event.target.value);
    };

    const submit = (event: any) => {
        event.preventDefault();
        let error = "";
        let errorPass = "";
        setPasswordError("");
        setError("");
        if (field === "пароль" && password.length <= 0) {
            errorPass = "Поле не заполнено";
        }
        if (fieldValue.length <= 0) {
            error = "Поле не заполнено";
        } else {
            if (field === "email") {
                const validateEmail = fieldValue.match(emailPattern);
                if (validateEmail === null) {
                    error = "Неверно указан email";
                }
            } else if (field === "пароль") {
                if (fieldValue.length < 5) {
                    error = "Пароль от 5 символов";
                }
                if (password !== fieldValue) {
                    errorPass = "Пароли не совпадают";
                }
            }
        }

        if (!error && !errorPass) {
            changeField(fieldValue);
            setClose();
            setSuccessOpen(true);
            setFieldValue("");
            setPassword("");
            setPasswordError("");
            setError("");
        } else {
            if (error) {
                setError(error);
            }
            if (errorPass) {
                setPasswordError(errorPass);
            }
        }
    };

    const changeField = (fieldValue: string) => {
        switch (field) {
            case "email":
                dispatch(changeEmail(fieldValue));
                changeEmailState({ email: fieldValue });
                break;
            case "фио":
                dispatch(changeFio(fieldValue));
                changeFioState({ fio: fieldValue });
                break;
            case "пароль":
                dispatch(changePassword(fieldValue));
                break;
        }
    };

    useEffect(() => {
        setFieldValue(currentValue);
    }, [currentValue]);

    return (
        <>
            <BasicModal
                open={open}
                body={
                    <div className={styles.verifyModal}>
                        <form onSubmit={submit}>
                            <TextField
                                id="profile-field"
                                label={field}
                                value={fieldValue}
                                type="text"
                                style={{ marginBottom: "10px" }}
                                onChange={handlerSetValue}
                                fullWidth
                            />

                            {error && (
                                <Typography style={{ color: "red" }}>
                                    {error}
                                </Typography>
                            )}

                            {field === "пароль" && (
                                <TextField
                                    id="repeat-password"
                                    label="Повторите пароль"
                                    type="text"
                                    style={{ marginBottom: "10px" }}
                                    onChange={handlerSetRepeatPasswordValue}
                                    fullWidth
                                />
                            )}

                            {passwordError && (
                                <Typography style={{ color: "red" }}>
                                    {passwordError}
                                </Typography>
                            )}

                            <Button
                                variant="contained"
                                style={{ width: "316px", marginBottom: "10px" }}
                                type="submit"
                            >
                                Изменить
                            </Button>
                        </form>
                    </div>
                }
                title={"Изменить " + field}
                showOkBtn={false}
                width={"xs"}
                setClose={setClose}
            />
        </>
    );
};

export default ProfileChangeFields;
