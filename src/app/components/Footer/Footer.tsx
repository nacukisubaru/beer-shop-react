import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../../../index.css";

const Footer: FC = () => {

    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{height: '150px'}}>
                        <Toolbar>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        </>
    );
};

export default Footer;