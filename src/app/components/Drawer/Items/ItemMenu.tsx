import { ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { FC } from "react";
import { Link } from "react-router-dom";

interface ItemMenuProps {
    name: string;
    link: string;
    onClick: () => void;
}

const ItemMenu: FC<ItemMenuProps> = ({ name, link, onClick }) => {
    return (
        <Link to={link} onClick={onClick} style={{textDecoration: 'none', color: 'black'}}>
            <ListItem key={name} disablePadding>
                <ListItemButton>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default ItemMenu;
