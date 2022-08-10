import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IconButton } from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CartBadge from "../Badges/CartBadge";
import FaceIcon from '@mui/icons-material/Face';
import MenuIcon from '@mui/icons-material/Menu';
import RoomIcon from '@mui/icons-material/Room';
import logo from '../../../assets/images/logo.png';
import vkIcon from '../../../assets/images/vk.png';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import "./css/style.css";


const Header: FC = () => {
    const countProducts: number = useAppSelector(
        (state) => state.basketReducer.count
    );

    const {switchMainMenu} = useActions();

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    style={{ 
                        height: "100px", 
                        background: "white",
                        display: 'flex',
                        justifyContent: 'center'  
                    }}
                >
                    <div className="wrapper-header">
                        <div className="header-nav-element">
                            <div className="nav-element-burger">
                                <IconButton onClick={switchMainMenu}>
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            <div>
                                <Box 
                                    style={{ backgroundSize: "contain", height: '88px', width: '121px' }}
                                    sx={{ background: `url(${logo}) center center no-repeat` }} 
                                >
                                </Box>
                            </div>
                        </div>
                        <div className="contacts">
                            <a className="phone-link" href="tel:+7 920 899 77 72">
                                <div className="wrapper-icons">
                                    <PhonelinkRingIcon /> +7 920 899 77 72
                                </div>
                            </a>
                            <div>ул. Братьев Луканиных, 7, Калуга</div>
                        </div>
                        <div className="wrapper-icons">
                            <a href="https://vk.com/id474817801" target="blank">
                                <Box 
                                    style={{ backgroundSize: "contain", height: '36px', width: '37px' }}
                                    sx={{ background: `url(${vkIcon}) center center no-repeat` }} 
                                />
                            </a>
                        </div>
                        <div className="wrapper-icons">
                            <div>
                                <IconButton>
                                    <RoomIcon style={{height: '30px', width: '30px'}}/>
                                </IconButton>
                            </div>
                            <div>
                                <Link to="/account">
                                    <IconButton>
                                        <FaceIcon style={{height: '30px', width: '30px'}}/>
                                    </IconButton>
                                </Link>
                            </div>
                            <div>
                                <CartBadge quantity={countProducts}></CartBadge>
                            </div>
                        </div>
                    </div>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;
