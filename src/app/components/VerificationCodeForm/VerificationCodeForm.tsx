import { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Timer from "../Timer/Timer";
import InputMask from "react-input-mask";

interface IVerificationCodeForm {
    requestCode: () => void;
    login: (code: string) => void;
    error: string;
    nameBtn: string;
}

const VerificationCodeForm: FC<IVerificationCodeForm> = ({
    requestCode,
    login,
    error,
    nameBtn
}) => {
    const { setMinutesResend, setSecondsResend, setCanResendCode } =useActions();
    const { minutesResend, secondsResend, canResendCode } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const [code, setCode] = useState("");

    useEffect(() => {
        if (minutesResend === 0 && secondsResend === 0) {
            setCanResendCode({ resendCode: true });
        }
    }, [minutesResend, secondsResend]);


    const handleSubmit = (e: any) => {
        e.preventDefault();
        login(code);
    };

    const handleChangeCode = (e: any) => {
        setCode(e.target.value);
    };

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "-6px",
        color: "red",
    };

    return (
        <form onSubmit={handleSubmit}>
        <InputMask
            mask="9 9 9 9"
            value={code}
            onChange={(e)=>{handleChangeCode(e)}}
        >
            <TextField
                fullWidth
                id="outlined-required"
                label="Код"
                type="text"
                style={{ marginBottom: "10px" }}
            />
         </InputMask>
            {error && <p style={styleError}>{error}</p>}
            {!canResendCode && (
                <div className="code-again-text">
                    <Typography>
                        <div style={{display:"flex", justifyContent: "space-evenly", marginBottom: "5px"}}>
                        Запросить код повторно через:  
                        <Timer
                            minutes={minutesResend}
                            seconds={secondsResend}
                            setMinutes={setMinutesResend}
                            setSeconds={setSecondsResend}
                        />
                        </div>
                    </Typography>
                </div>
            )}

            <Button
                variant="contained"
                style={{ width: "316px", marginBottom: "10px" }}
                type="submit"
            >
                {nameBtn}
            </Button>

            <Button
                variant="contained"
                style={{ width: "316px", marginBottom: "10px" }}
                onClick={requestCode}
                disabled={canResendCode === true ? false : true}
            >
                Запросить код
            </Button>
        </form>
    );
}

export default VerificationCodeForm;