import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Anchor = "top" | "left" | "bottom" | "right";

interface IDrawer {
    name:string;
    arrayList: [];
    additionalList: any[];
    position: Anchor;
    isOpen: boolean;
    close: () => void;
    showApplyBtn: boolean;
    callbackApplyBtn: () => void;
    callbackResetBtn: () => void;
}

const useStyles = makeStyles({
    containerApplyBtn: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    wrapperApplyBtn: {
        display: "flex", 
        alignItems: "flex-end",
        marginBottom: "17px"
    }
});

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
    const classes = useStyles();
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
                    <List sx={{marginLeft: "6px"}}>{additionalList.map((item) => item)}</List>
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
                        <div className={classes.containerApplyBtn}>
                            <div className={classes.wrapperApplyBtn}>
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
