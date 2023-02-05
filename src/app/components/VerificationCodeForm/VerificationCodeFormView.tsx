import { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Timer from "../Timer/Timer";
import InputMask from "react-input-mask";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VerificationCodeForm from "./VerificationCodeForm";
//import "./css/style.css";

interface VerificationCodeFormViewProps {
    error: string;
    requestCode: () => void;
    login: (code: string) => void;
    back?: () => void;
}

const VerificationCodeFormView: FC<VerificationCodeFormViewProps> = ({
    requestCode,
    login,
    error,
    back,
}) => {

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
                        <KeyboardBackspaceIcon
                            style={{ display: "flex", cursor: "pointer" }}
                            onClick={back}
                        />

                        <Typography variant="h5" component="div">
                            <h2>Введите код</h2>
                        </Typography>
                        <VerificationCodeForm
                            requestCode={requestCode}
                            login={login}
                            error={error}
                            nameBtn="Войти"
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default VerificationCodeFormView;
