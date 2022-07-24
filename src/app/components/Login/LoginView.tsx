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
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: any) => {
        const {email, password} = data;
        login({email, password});
    };

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
                                {...register("email")}
                                required
                                fullWidth
                                id="outlined-required"
                                label="Email"
                                style={{ marginBottom: "10px" }}
                            />
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Пароль"
                                {...register("password")}
                                style={{ marginBottom: "10px" }}
                            />
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
