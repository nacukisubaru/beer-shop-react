import { FC, useState } from "react";
import { ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface IFilterMenu {
    component: any;
    name: string
}

const ItemFilterMenu: FC<IFilterMenu> = ({name, component}) => {
    const [isOpen, setOpen] = useState(false);

    const handlerToggleFilters = () => {
        if(!isOpen) {
            setOpen(true); 
        } else {
            setOpen(false); 
        }
    }

    return (
        <>
            <ListItem key={name} disablePadding>
                <ListItemButton onClick={handlerToggleFilters}>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
            {isOpen && (component)}
        </>
    );
};

export default ItemFilterMenu;
