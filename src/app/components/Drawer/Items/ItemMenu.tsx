import { ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { FC } from "react";
import { Link } from "react-router-dom";

interface ItemMenu {
    name: string;
    link: string;
}

const ItemMenu: FC<ItemMenu> = ({ name, link }) => {
    return (
        <Link to={link} style={{textDecoration: 'none', color: 'black'}}>
            <ListItem key={name} disablePadding>
                <ListItemButton>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default ItemMenu;
