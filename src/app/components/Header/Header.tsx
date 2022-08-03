import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CartBadge from "../Badges/CartBadge";
import { useAppSelector } from "../../hooks/useAppSelector";

const Header: FC = () => {
    const countProducts:number = useAppSelector((state) => state.basketReducer.count);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{height: '100px', background: "white"}}>
                    <div>
                        <CartBadge quantity={countProducts}></CartBadge>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                Пивградъ
                            </Typography>
                    </div>
                    
                  
                </AppBar>
            </Box>
        </>
    );
};

export default Header;
