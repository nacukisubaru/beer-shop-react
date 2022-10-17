import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React, { FC } from "react";
import { ILogin } from "../../store/services/users/types/auth.types";
import { useForm } from "react-hook-form";
import AccessibleTabs from "../Tabs/AccessibleTabs";

interface LoginProps {
    login: (post: ILogin) => void;
    error: {
        message: string
    }
}

const LoginView: FC<LoginProps> = ({ login, error }) => {
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur"
    });

    const onSubmit = (data: any) => {
        const {email, password} = data;
        login({email, password});
    };

    const styleError = {
        display: 'flex',
        justifyContent: 'left',
        marginTop: '-6px',
        color: 'red'
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("email",  { 
                        required: "Поле обязательно к заполнению",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Некорректный email'
                        }
                    })}
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    style={{ marginBottom: "10px" }}
                />
                    {errors.email && <p style={styleError}>{errors.email.message}</p>}
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
                    {errors.password && <p style={styleError}>{errors.password.message}</p>}
                    {error.message && <p style={styleError}>{error.message}</p>}
                <Button
                    variant="contained"
                    style={{ width: "316px", marginBottom: "10px"}}
                    type="submit"
                >
                    Войти
                </Button>
                <Button
                    variant="contained"
                    style={{ width: "316px", marginBottom: "10px"}}
                    type="submit"
                >
                    Войти по коду
                </Button>
            </form>
        </>
    );
};
export default LoginView;
