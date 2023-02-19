import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../hooks/useAppSelector";

const LoginAdmin: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            loginAdmin: "",
            password: "",
        },
        mode: "onBlur",
    });

    const { error } = useAppSelector((state) => state.userReducer);

    const onSubmit = (data: any) => {
        const { loginAdmin, password } = data;
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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "50px auto 0",
            }}
        >
            <Card sx={{ width: 350 }}>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("loginAdmin", {
                                required: "Поле обязательно для заполнения",
                            })}
                            fullWidth
                            id="login-admin"
                            label="Логин"
                            style={{ marginBottom: "10px" }}
                        />

                        <Typography style={styleError}>
                            {errors.loginAdmin && errors.loginAdmin.message}
                        </Typography>

                        <TextField
                            fullWidth
                            id="outlined-required"
                            label="Пароль"
                            type="password"
                            {...register("password", {
                                required: "Поле обязательно для заполнения",
                            })}
                            style={{ marginBottom: "10px" }}
                        />
                        <Typography style={styleError}>
                            {errors.password && errors.password.message}{" "}
                        </Typography>
                        {error.message && (
                            <Typography style={styleGlobalError}>
                                {error.message}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            style={{ width: "316px", marginBottom: "10px" }}
                            type="submit"
                        >
                            Войти
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginAdmin;
