import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
interface IMenuItem {
    name: string;
    icon?: any;
    onClick: () => void;
}

interface IPositionedMenu {
    title: string;
    useButton?: boolean;
    menuItemList: IMenuItem[];
}

const PositionedMenu: React.FC<IPositionedMenu> = ({
    title,
    useButton,
    menuItemList,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {useButton ? (
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    {title}
                </Button>
            ) : (
                <Typography
                    variant="body1"
                    style={{ cursor: "pointer" }}
                    onClick={handleClick}
                >
                    {title}
                </Typography>
            )}
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {menuItemList.map((item: IMenuItem) => {
                    return (
                        <MenuItem key={item.name} onClick={item.onClick}>
                            {item.icon && (
                                <div key={item.name} style={{marginRight: '5px'}}>{ item.icon }</div>
                            )}
                            {item.name}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};
export default PositionedMenu;
