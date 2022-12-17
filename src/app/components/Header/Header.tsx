import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IconButton, Typography } from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import Image from 'next/image';
import Link from 'next/link';
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
import styles from "./styles/header.module.css";

const Header: FC = () => {
    const countProducts: number = useAppSelector(
        (state) => state.basketReducer.count
    );   
    const {checkRoleUser} = useAuthorizationUser();
    const {switchMainMenu} = useActions();
    
    return (
        <header>
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
                    <div className={styles.wrapperHeader}>
                        <div className={styles.headerNavElement}>
                            <div className={styles.navElementBurger}>
                                <IconButton onClick={switchMainMenu}>
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            <div>
                                <Image className={styles.logo} style={{ backgroundSize: "contain"}} src={logo}/>
                            </div>
                        </div>
                        <div className={styles.contacts}>
                            <a className={styles.phoneLink} href="tel:+7 920 899 77 72">
                                <div className={styles.wrapperIcons}>
                                <PhonelinkRingIcon /><Typography> +7 920 899 77 72 </Typography>
                                </div>
                            </a>
                            <div>
                                <Typography>
                                    <a className={styles.phoneLink} href="https://2gis.ru/kaluga/firm/70000001036699976" target="blank">ул. Братьев Луканиных, 7, Калуга</a>
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.wrapperIcons}>
                            <a className={styles.vkIcon} href="https://vk.com/id474817801" target="blank">
                                {/* <Box 
                                    style={{ backgroundSize: "contain", height: '36px', width: '37px' }}
                                    sx={{ background: `url(${vkIcon}) center center no-repeat` }} 
                                /> */}
                                 <Image  style={{ backgroundSize: "contain", height: '36px', width: '37px' }} src={vkIcon}  />
                            </a>
                            <div>
                                <IconButton>
                                    <RoomIcon style={{height: '30px', width: '30px'}}/>
                                </IconButton>
                            </div>
                            {checkRoleUser("ADMIN") && ( <div>
                                <Link href="/admin/main">
                                    <IconButton>
                                        <AdminPanelSettingsIcon style={{height: '30px', width: '30px'}}/>
                                    </IconButton>
                                </Link>
                            </div>)}
                           
                            <div>
                                <Link href="/account">
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
        </header>
    );
};

export default Header;
