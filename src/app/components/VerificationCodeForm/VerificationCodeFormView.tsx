import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface VerificationCodeFormView {
    error: string,
    requestCode: () => void
}

const VerificationCodeFormView: FC<VerificationCodeFormView> = ({requestCode, error}) => {

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
                            <h2>Введите код</h2>
                        </Typography>
                        <form onSubmit={() => {}}>
                            <TextField
                                fullWidth
                                id="outlined-required"
                                label="Код"
                                type="text"
                                style={{ marginBottom: "10px" }}
                            />
                           {error && <p style={styleError}>{error}</p>}
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
