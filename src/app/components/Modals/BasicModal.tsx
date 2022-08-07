import { FC } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./css/style.css";
import { Close } from "@mui/icons-material";

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
                      {title}
                    </DialogTitle>
                )}
                <Box position="absolute" top={0} right={0}>
                    <IconButton onClick={setClose}>
                        <Close />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {(body)}
                    </DialogContentText>
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
