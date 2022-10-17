import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { ILogin } from "../../store/services/users/types/auth.types";
import InputMask from "react-input-mask";

interface RegistrationViewProps {
    registrate: (post: ILogin) => void;
    error: {
        message: string
    }
}

const RegistrationView: FC<RegistrationViewProps> = ({registrate, error}) => {
    const [passwordsEquals, setEqualsPasswords] = useState(true);
    const [phoneInput, setPhoneInput] = useState("");
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            phone: "",
            email: "",
            password: "",
            retryPassword: ""
        },
        mode: "onBlur"
    });

    const onSubmit = (data: any) => {
        const {phone, password, retryPassword} = data;
        if(password === retryPassword) {
            registrate({phone, password});
            setEqualsPasswords(true);
        } else {
            setEqualsPasswords(false);
        }
    };

    const fillInputPhone = (e:any) => {
        setPhoneInput(e.target.value)
    }

    const styleError = {
        display: 'flex',
        justifyContent: 'left',
        marginTop: '-6px',
        color: 'red'
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputMask
                    {...register("phone",  { 
                        required: "Поле обязательно к заполнению",
                    })}
                    mask="+7 (999) 99 99 999"
                    value={phoneInput}
                    onChange={(e)=>{fillInputPhone(e)}}
                    
                >
                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Номер телефона"
                        style={{ marginBottom: "10px" }}
                       
                    />
                </InputMask>
                {errors.phone && <p style={styleError}>{errors.phone.message}</p>}
                
                <TextField
                    {...register("email", {
                        required: "Поле обязательно к заполнению",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Некорректный email",
                        },
                    })}
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    style={{ marginBottom: "10px" }}
                />
                {errors.email && (
                    <p style={styleError}>{errors.email.message}</p>
                )}
                <TextField
                    fullWidth
                    id="outlined-required"
                    label="Пароль"
                    type="password"
                    {...register("password", {
                        required: "Поле обязательно к заполнению",
                        minLength: {
                            value: 5,
                            message: 'Минимум 5 символов'
                        }
                    })}
                    style={{ marginBottom: "10px" }}
                />
                    {errors.password && (
                    <p style={styleError}>
                        {errors.password.message}
                    </p>
                )}
                <TextField
                    fullWidth
                    id="outlined-required"
                    label="Повторите пароль"
                    type="password"
                    {...register("retryPassword", {
                        required: "Поле обязательно к заполнению",
                        minLength: {
                            value: 5,
                            message: 'Минимум 5 символов'
                        }
                    })}
                    style={{ marginBottom: "10px" }}
                />
                {errors.retryPassword && (
                    <p style={styleError}>
                        {errors.retryPassword.message}
                    </p>
                )}
                {!passwordsEquals && (<p style={styleError}>Пароли не совпадают</p>)}
                {error.message && (
                    <p style={styleError}>{error.message}</p>
                )}
                    <Button
                    variant="contained"
                    style={{
                            width: "316px",
                            marginBottom: "10px" 
                    }}
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
            </form>   
        </>
    );
};

export default RegistrationView;
