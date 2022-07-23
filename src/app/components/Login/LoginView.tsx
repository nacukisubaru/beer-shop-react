import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import React, {FC} from 'react';
import { ILogin } from "../../store/services/users/types/auth.types";

interface LoginProps {
    login: (post: ILogin) => void
}

const LoginView: FC<LoginProps> = ({login}) => {
    return (
        <>
            <div style={{display:'flex', justifyContent: 'center', margin: '50px auto 0'}}>
                <Card sx={{ width: 350 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            <h2>Авторизация</h2>
                        </Typography>
                        
                        <TextField
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
                        />
                    </CardContent>
                    <CardActions style={{display:'flex', justifyContent: 'center',  marginBottom: "5px"}}>
                        <Button 
                            variant="contained" 
                            style={{width: '316px'}}
                            onClick={()=>{login({email: 'kristinskiy99@mail.ru', password: 'ten9285ten'})}}
                        >
                            Войти
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}
export default LoginView;
