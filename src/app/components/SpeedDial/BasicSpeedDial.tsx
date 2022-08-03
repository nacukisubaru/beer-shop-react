
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, { FC } from "react";
import { IAction } from "../../types/action.deal.types";

interface ISpeedDeal {
    actions: IAction[]
}

const BasicSpeedDial:FC<ISpeedDeal> = ({actions}) => {
    return (
        <Box
            sx={{
                transform: "translateZ(0px)",
                flexGrow: 1,
                position: "fixed",
                bottom: "1px",
                marginLeft: "25px",
                background: "#896043",
            }}
        >

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 16, right: 16, '& .MuiFab-primary': { backgroundColor: '#896043', color: 'white' } }}
                icon={<MenuBookIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.click}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

export default BasicSpeedDial;