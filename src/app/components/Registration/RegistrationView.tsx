import { Button, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
    IRegistration,
    IRegistrationFields,
} from "../../store/services/users/types/auth.types";
import InputMask from "react-input-mask";
import { CheckBox } from "@mui/icons-material";
import HTMLReactParser from "html-react-parser";
import { decodeHtml } from "../../helpers/stringHelper";
import { emailPattern } from "../../helpers/validationHelper";

interface RegistrationViewProps {
    registrate: (post: IRegistration) => void;
    setRegistrationFields: (fields: IRegistrationFields) => void;
    consentText?: string;
    defaultValues: {
        phone: string;
        email: string;
        password: string;
        retryPassword: string;
    };
    error: {
        message: string;
    };
}

const RegistrationView: FC<RegistrationViewProps> = ({
    registrate,
    setRegistrationFields,
    consentText,
    defaultValues,
    error,
}) => {
    const [phoneInput, setPhoneInput] = useState(defaultValues.phone);
    const [passwordsEquals, setEqualsPasswords] = useState(true);
    const {
        setError,
        setValue,
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onBlur",
    });

    const onSubmit = (data: any) => {
        const { phone, email, password, retryPassword } = data;
        if (password === retryPassword) {
            registrate({ phone, email, password });
            setEqualsPasswords(true);
        } else {
            setEqualsPasswords(false);
        }
    };

    const checkFillPhoneInput = () => {
        if (!phoneInput || "+7 (___) __ __ ___" === phoneInput) {
            setError("phone", {
                type: "custom",
                message: "Поле обязательно для заполнения",
            });
        } else {
            setValue("phone", phoneInput, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    };

    const fillInputPhone = (e: any) => {
        setPhoneInput(e.target.value);
    };

    const updateField = (e: any) => {
        setValue(e.target.name, e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
        });

        const { phone, email, password, retryPassword } = getValues();
        setRegistrationFields({ phone, email, password, retryPassword });
    };

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginBottom: "5px",
        color: "red",
    };

    const styleGlobalError = {
        display: "flex",
        justifyContent: "left",
        color: "red",
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputMask
                    {...register("phone", {
                        required: "Поле обязательно для заполнения",
                    })}
                    mask="+7 (999) 99 99 999"
                    onBlur={checkFillPhoneInput}
                    value={phoneInput}
                    onChange={(e) => {
                        fillInputPhone(e);
                        updateField(e);
                    }}
                >
                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Номер телефона"
                        style={{ marginBottom: "10px" }}
                    />
                </InputMask>
                <Typography style={styleError}>
                    {errors.phone && errors.phone.message}
                </Typography>

                <TextField
                    {...register("email", {
                        required: "Поле обязательно для заполнения",
                        pattern: {
                            value: emailPattern,
                            message: "Некорректный email",
                        },
                    })}
                    onChange={updateField}
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    style={{ marginBottom: "10px" }}
                />
                <Typography style={styleError}>
                    {errors.email && errors.email.message}
                </Typography>
                <TextField
                    fullWidth
                    id="outlined-required"
                    label="Пароль"
                    type="password"
                    {...register("password", {
                        required: "Поле обязательно для заполнения",
                        minLength: {
                            value: 5,
                            message: "Минимум 5 символов",
                        },
                    })}
                    onChange={updateField}
                    style={{ marginBottom: "10px" }}
                />
                <Typography style={styleError}>
                    {errors.password && errors.password.message}
                </Typography>
                <TextField
                    fullWidth
                    id="outlined-required"
                    label="Повторите пароль"
                    type="password"
                    {...register("retryPassword", {
                        required: "Поле обязательно для заполнения",
                        minLength: {
                            value: 5,
                            message: "Минимум 5 символов",
                        },
                    })}
                    onChange={updateField}
                    style={{ marginBottom: "10px" }}
                />
                {errors.retryPassword && (
                    <Typography style={styleError}>
                        {errors.retryPassword.message}
                    </Typography>
                )}
                <Typography style={styleError}>
                    {!passwordsEquals && "Пароли не совпадают"}
                </Typography>
                {error.message && (
                    <Typography style={styleGlobalError}>
                        {error.message}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    style={{
                        width: "316px",
                        marginBottom: "10px",
                    }}
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
                {consentText && (
                    <>
                        <div style={{ display: "flex", wordBreak: "break-all" }}>
                            <CheckBox
                                sx={{
                                    marginTop: "14px",
                                    marginRight: "5px",
                                    color: "#b15122",
                                }}
                            />

                            {HTMLReactParser(decodeHtml(consentText))}
                        </div>
                    </>
                )}
            </form>
        </>
    );
};

export default RegistrationView;
