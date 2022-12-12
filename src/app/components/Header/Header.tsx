import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IconButton, Typography } from "@mui/material";
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
//import "./css/style.css";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";


const Header: FC = () => {
    const countProducts: number = useAppSelector(
        (state) => state.basketReducer.count
    );   
    //const {checkRoleUser} = useAuthorizationUser();
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
                                    className="logo"
                                    style={{ backgroundSize: "contain"}}
                                    sx={{ background: `url(${logo}) center center no-repeat` }} 
                                >
                                </Box>
                            </div>
                        </div>
                        <div className="contacts">
                            <a className="phone-link" href="tel:+7 920 899 77 72">
                                <div className="wrapper-icons">
                                <PhonelinkRingIcon /><Typography> +7 920 899 77 72 </Typography>
                                </div>
                            </a>
                            <div>
                                <Typography>
                                    <a className="phone-link" href="https://2gis.ru/kaluga/firm/70000001036699976" target="blank">ул. Братьев Луканиных, 7, Калуга</a>
                                </Typography>
                            </div>
                        </div>
                        <div className="wrapper-icons">
                            <a className="vk-icon" href="https://vk.com/id474817801" target="blank">
                                <Box 
                                    style={{ backgroundSize: "contain", height: '36px', width: '37px' }}
                                    sx={{ background: `url(${vkIcon}) center center no-repeat` }} 
                                />
                            </a>
                            <div>
                                <IconButton>
                                    <RoomIcon style={{height: '30px', width: '30px'}}/>
                                </IconButton>
                            </div>
                            {/* {checkRoleUser("ADMIN") && ( <div>
                                <Link to="/admin">
                                    <IconButton>
                                        <AdminPanelSettingsIcon style={{height: '30px', width: '30px'}}/>
                                    </IconButton>
                                </Link>
                            </div>)}
                           
                            <div>
                                <Link to="/account">
                                    <IconButton>
                                        <FaceIcon style={{height: '30px', width: '30px'}}/>
                                    </IconButton>
                                </Link>
                            </div> */}
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
