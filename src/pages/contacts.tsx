import { Typography } from "@mui/material";
import YMapContacts from "../app/components/YandexMaps/Contacts/YMapContacts";


const Contacts = () => {
    return (
        <>
            <div style={{ paddingLeft: "40px", marginTop: "25px" }}>
                <Typography>Адрес:</Typography>
                <Typography style={{ fontWeight: "bold", marginBottom: "20px" }}>
                    Братьев Луканиных, 7, Калуга
                </Typography>

                <Typography>Номер телефона:</Typography>
                <Typography style={{ fontWeight: "bold", marginBottom: "20px" }}>
                    +7 920 899 77 72 
                </Typography>
                <Typography style={{ fontWeight: "bold", marginBottom: "20px" }}>
                   Заходите будем рады :3
                </Typography>
            </div>

            <YMapContacts />
        </>
    );
};

export default Contacts;
