import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CloseIcon from '@mui/icons-material/Close';
//import "./css/style.css";
import { IconButton } from "@mui/material";

type Anchor = "top" | "left" | "bottom" | "right";

interface IDrawer {
    name:string;
    arrayList: [];
    additionalList: [];
    position: Anchor;
    isOpen: boolean;
    close: () => void;
    showApplyBtn: boolean;
    callbackApplyBtn: () => void;
    callbackResetBtn: () => void;
}

const TemporaryDrawer: FC<IDrawer> = ({
    name,
    arrayList,
    additionalList,
    position,
    isOpen = false,
    close,
    showApplyBtn = false,
    callbackApplyBtn,
    callbackResetBtn
}) => {
    
    const [isOpenList, setOpen] = useState(true);
    const handlerToggleList = () => {
        if(!isOpenList) {
            setOpen(true); 
        } else {
            setOpen(false); 
        }
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 375,
            }}
            role="presentation"
        >
            <IconButton onClick={close}>
                <CloseIcon />
            </IconButton>
            <List>
                <ListItemButton onClick={handlerToggleList}>
                    <ListItemText primary={name} style={{marginLeft: '6px'}}/>
                </ListItemButton>
                <div style={{marginLeft: '6px'}}>
                    {isOpenList && arrayList.map((item) => item)}
                </div>
            </List>
            {additionalList.length > 0 && (
                <>
                    <Divider />
                    <List>{additionalList.map((item) => item)}</List>
                </>
            )}
          
        </Box>
    );

    return (
        <div>
            <React.Fragment key={position}>
                <Drawer anchor={position} open={isOpen} onClose={close}>
                    {list(position)}
                    {showApplyBtn && (
                        <div className="container-apply-btn">
                            <div className="wrap-apply-btn">
                                <Button variant="outlined" onClick={callbackResetBtn} style={{marginRight: '5px'}}>Cбросить</Button>
                                <Button variant="contained" onClick={callbackApplyBtn}>Применить</Button>
                            </div>
                        </div>
                    )}
                </Drawer>
            </React.Fragment>
        </div>
    );
};

export default TemporaryDrawer;
