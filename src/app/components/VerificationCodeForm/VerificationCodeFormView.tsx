import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface VerificationCodeFormView {}

const VerificationCodeFormView: FC<VerificationCodeFormView> = () => {
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
                <form onSubmit={()=>{}}>
                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Код"
                        type="text"
                        style={{ marginBottom: "10px" }}
                    />

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
</>
   ); 
}

export default VerificationCodeFormView;