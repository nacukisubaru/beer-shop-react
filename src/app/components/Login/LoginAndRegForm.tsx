import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import AccessibleTabs from "../Tabs/AccessibleTabs";
import LoginContainer from "./LoginContainer";
import RegistrationContainer from "../Registration/RegistrationContainer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
interface LoginAndRegistrationForm {}

const LoginAndRegistrationForm: FC<LoginAndRegistrationForm> = () => {
    const accountForm = useAppSelector((state) => state.accountFormsReducer);
    const {isAuth} = useAppSelector(state => state.userReducer);
    const {switchRegForm, switchLoginForm, clearUserErrors} = useActions();

    const handlerLoginClick = () => {
        switchLoginForm();
        clearUserErrors();
    }

    const handlerRegClick = () => {
        switchRegForm();
        clearUserErrors();
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
                            <h2>
                                {accountForm.isLoginForm ? ('Авторизация') : accountForm.isRegistrationForm && ('Регистрация')}
                            </h2>
                        </Typography>
                        <AccessibleTabs
                            items={[
                                {
                                    name: "Войти",
                                    onClick: handlerLoginClick,
                                },
                                {
                                    name: "Регистрация",
                                    onClick: handlerRegClick,
                                },
                            ]}
                        />

                        {accountForm.isLoginForm && !isAuth ? (
                            <LoginContainer />
                        ) : accountForm.isRegistrationForm && !isAuth && (
                            <RegistrationContainer />
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default LoginAndRegistrationForm;
