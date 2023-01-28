import { ListItem } from "@mui/material";
import { FC } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
interface ItemMenuProps {
    name: string;
    link: string;
    onClick?: () => void;
}

const ItemMenu: FC<ItemMenuProps> = ({ name, link, onClick }) => {
    return (
        <Link href={link} onClick={onClick} style={{textDecoration: 'none', color: 'black'}}>
            <ListItem key={name} disablePadding>
                <ListItemButton>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default ItemMenu;
