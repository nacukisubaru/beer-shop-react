import { IconButton } from "@mui/material";
import { FC } from "react";
import { IButtonOption } from "../../../../../types/ui.types";

interface IActionProps {
    buttons: IButtonOption[];
    paramsAction: any;
}

const Action: FC<IActionProps> = ({ buttons, paramsAction }) => {
    return (
        <strong>
            {buttons.map((button) => {
                const handleClick = () => {
                    button.onClick(paramsAction);
                };
                return (
                    <IconButton
                        color={button.color}
                        size={button.size}
                        component="span"
                        onClick={handleClick}
                    >
                        {button.icon}
                    </IconButton>
                );
            })}
        </strong>
    );
};

export default Action;
