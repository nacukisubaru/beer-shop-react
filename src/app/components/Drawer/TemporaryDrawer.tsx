import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

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
}

const TemporaryDrawer: FC<IDrawer> = ({
    name,
    arrayList,
    additionalList,
    position,
    isOpen = false,
    close,
    showApplyBtn = false,
    callbackApplyBtn
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
                         <Button style={{height: '100%', alignItems: 'end'}} onClick={callbackApplyBtn}>Применить</Button>
                    )}
                </Drawer>
                
            </React.Fragment>
        </div>
    );
};

export default TemporaryDrawer;
