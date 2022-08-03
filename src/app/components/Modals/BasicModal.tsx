import { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./css/style.css";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

interface IBasicModal {
    open: boolean,
    body: any,
    setOpen: () => void,
    setClose: () => void,
}

const BasicModal: FC<IBasicModal> = ({ open, body, setOpen, setClose }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={setOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                   {(body)}
                   <div className="wrap-button">
                        <Button onClick={setClose}>Ок</Button>
                   </div>
                </Box>
            </Modal>
        </div>
    );
};

export default BasicModal;
