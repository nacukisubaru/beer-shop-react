import { FC } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./css/style.css";
import { Close } from "@mui/icons-material";
import { fontWeight } from "@mui/system";

interface IBasicModal {
    open: boolean;
    body: any;
    title: string;
    showOkBtn: boolean;
    setOpen: () => void;
    setClose: () => void;
}

const BasicModal: FC<IBasicModal> = ({
    open,
    body,
    showOkBtn = false,
    title,
    setOpen,
    setClose,
}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={setClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth={true}
            >
                { title && (
                    <DialogTitle id="alert-dialog-title">
                       <Typography style={{fontWeight: 'bold', fontSize: '20px'}}>{title}</Typography> 
                    </DialogTitle>
                )}
                <Box position="absolute" top={0} right={0}>
                    <IconButton onClick={setClose}>
                        <Close />
                    </IconButton>
                </Box>
                <DialogContent>
                    {(body)}
                </DialogContent>
                <DialogActions>
                    {showOkBtn && (
                        <Button onClick={setClose} autoFocus>
                            ОК
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BasicModal;
