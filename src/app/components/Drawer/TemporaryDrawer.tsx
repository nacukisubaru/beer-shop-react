import React, { FC } from "react";
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
    arrayList: [];
    additionalList: [];
    position: Anchor;
    isOpen: boolean;
    close: () => void;
}

const TemporaryDrawer: FC<IDrawer> = ({
    arrayList,
    additionalList,
    position,
    isOpen = false,
    close,
}) => {
    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
        >
            <List>{arrayList.map((item) => item)}</List>
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
                </Drawer>
            </React.Fragment>
        </div>
    );
};

export default TemporaryDrawer;
