import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React, { FC } from "react";
import { ILogin } from "../../store/services/users/types/auth.types";
import { useForm } from "react-hook-form";

interface LoginProps {
    login: (post: ILogin) => void;
}

const LoginView: FC<LoginProps> = ({ login }) => {
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "50px auto 0",
                }}
            >
                <Card sx={{ width: 350 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            <h2>Авторизация</h2>
                        </Typography>
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
                                {...register("password", { 
                                    required: "Поле обязательно к заполнению",
                                    minLength: {
                                        value: 5,
                                        message: 'Минимум 5 символов'
                                    }
                                })}
                                style={{ marginBottom: "10px" }}
                            />
                             {errors.password && <p style={styleError}>{errors.password.message}</p>}
                            <Button
                                variant="contained"
                                style={{ width: "316px" }}
                                type="submit"
                            >
                                Войти
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
export default LoginView;
