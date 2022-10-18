import { FC, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Timer from "../Timer/Timer";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./css/style.css";

interface VerificationCodeFormView {
    error: string;
    requestCode: () => void;
    login: (code: string) => void;
}

const VerificationCodeFormView: FC<VerificationCodeFormView> = ({
    requestCode,
    login,
    error,
}) => {
    const { setMinutesResend, setSecondsResend, setCanResendCode } =
        useActions();
    const { minutesResend, secondsResend, canResendCode } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const [code, setCode] = useState("");
    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "-6px",
        color: "red",
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        login(code);
    };

    const handleChangeCode = (e: any) => {
        setCode(e.target.value);
    };

    useEffect(() => {
        if (minutesResend == 0 && secondsResend == 0) {
            setCanResendCode({ resendCode: true });
        }
    }, [minutesResend, secondsResend]);

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
                            <h2>Введите код</h2>
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                id="outlined-required"
                                label="Код"
                                type="text"
                                onChange={handleChangeCode}
                                style={{ marginBottom: "10px" }}
                            />
                            {error && <p style={styleError}>{error}</p>}
                            {!canResendCode && (
                                <div className="code-again-text">
                                    Запросить код повторно через:{" "}
                                    <Timer
                                        minutes={minutesResend}
                                        seconds={secondsResend}
                                        setMinutes={setMinutesResend}
                                        setSeconds={setSecondsResend}
                                    />{" "}
                                </div>
                            )}

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
                                onClick={requestCode}
                                disabled={canResendCode == true ? false : true}
                            >
                                Запросить код
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default VerificationCodeFormView;
