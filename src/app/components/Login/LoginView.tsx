import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { FC, useState } from "react";
import { ILogin } from "../../store/services/users/types/auth.types";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
interface LoginProps {
    login: (post: ILogin) => void;
    error: {
        message: string;
    };
}

const LoginView: FC<LoginProps> = ({ login, error }) => {
    const {
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

    const [phoneInput, setPhoneInput] = useState("");

    const fillInputPhone = (e:any) => {
        setPhoneInput(e.target.value)
    }

    const onSubmit = (data: any) => {
        const { phone, password } = data;
        console.log(phone);
        login({ phone, password });
        console.log(phoneInput);
    };

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "-6px",
        color: "red",
    };

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
                    fullWidth
                    id="outlined-required"
                    label="Пароль"
                    type="password"
                    {...register("password", {
                        required: "Поле обязательно к заполнению",
                    })}
                    style={{ marginBottom: "10px" }}
                />
                {errors.password && (
                    <p style={styleError}>{errors.password.message}</p>
                )}
                {error.message && <p style={styleError}>{error.message}</p>}
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
                    type="submit"
                >
                    Войти по коду
                </Button>
            </form>
        </>
    );
};
export default LoginView;
