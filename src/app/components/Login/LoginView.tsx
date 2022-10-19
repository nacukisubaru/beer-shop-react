import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { FC, useState } from "react";
import { ILogin } from "../../store/services/users/types/auth.types";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
interface LoginProps {
    login: (post: ILogin) => void;
    loginByCode: (phone: string) => void;
    error: {
        message: string;
    };
}

const LoginView: FC<LoginProps> = ({ login, loginByCode, error }) => {
    const [phoneInput, setPhoneInput] = useState("");
    const {
        setError,
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phone: "",
            password: "",
        },
        mode: "onBlur",
    });

    const fillInputPhone = (e: any) => {
        setPhoneInput(e.target.value);
    };

    const onSubmit = (data: any) => {
        const { phone, password } = data;
        login({ phone, password });
    };

    const checkFillPhoneInput = () => {
        if (!phoneInput || "+7 (___) __ __ ___" == phoneInput) {
            setError("phone", {
                type: "custom",
                message: "Поле обязательно к заполнению",
            });
        } else {
            setValue("phone", phoneInput, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    };

    const handlerLoginByCode = () => {
        if (phoneInput) {
            loginByCode(phoneInput);
        } else {
            setError("phone", {
                type: "custom",
                message: "Поле обязательно к заполнению",
            });
        }
    };

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "-9px",
        height: "6px",
        color: "red",
    };

    const styleGlobalError = {
        display: "flex",
        justifyContent: "left",
        //marginTop: "-9px",
        color: "red",
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputMask
                    mask="+7 (999) 99 99 999"
                    value={phoneInput}
                    onBlur={checkFillPhoneInput}
                    onChange={(e) => {
                        fillInputPhone(e);
                    }}
                >
                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Номер телефона"
                        style={{ marginBottom: "10px" }}
                    />
                </InputMask>

                <input
                    {...register("phone", {
                        required: "Поле обязательно к заполнению",
                    })}
                    id="phone-input-hidden"
                    hidden={true}
                    style={{ marginBottom: "10px" }}
                />
                <p style={styleError}>{errors.phone && errors.phone.message}</p>

                <TextField
                    fullWidth
                    id="outlined-required"
                    label="Пароль"
                    type="password"
                    {...register("password", {
                        required: "Поле обязательно к заполнению",
                    })}
                    style={{ marginBottom: "10px" }}
                />
                <p style={styleError}>{errors.password && errors.password.message}</p>
                {error.message && <p style={styleGlobalError}>{error.message}</p>}
                <Button
                    variant="contained"
                    style={{ width: "316px", marginBottom: "10px" }}
                    type="submit"
                >
                    Войти
                </Button>
                <Button
                    variant="contained"
                    style={{ width: "316px", marginBottom: "10px" }}
                    onClick={() => {
                        handlerLoginByCode();
                    }}
                >
                    Войти по коду
                </Button>
            </form>
        </>
    );
};
export default LoginView;
