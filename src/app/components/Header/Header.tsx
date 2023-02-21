import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IconButton, Typography } from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import { useRouter } from "next/router";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CartBadge from "../Badges/CartBadge";
import FaceIcon from "@mui/icons-material/Face";
import MenuIcon from "@mui/icons-material/Menu";
import RoomIcon from "@mui/icons-material/Room";
import logo from "../../../assets/images/logo.png";
import vkIcon from "../../../assets/images/vk.png";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import styles from "./styles/header.module.css";
import PositionedMenu from "../PositionedMenu/PositionedMenu";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import IcecreamIcon from "@mui/icons-material/Icecream";
import SetMealIcon from "@mui/icons-material/SetMeal";
import Link from "next/link";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const countProducts: number = useAppSelector(
        (state) => state.basketReducer.count
    );

    const { phone, address, linkForAddress, socialNetworkLink } =
        useAppSelector((state) => state.headerReducer);

    const { checkRoleUser } = useAuthorizationUser();
    const { switchMainMenu } = useActions();
    const router = useRouter();
    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    style={{
                        height: "100px",
                        background: "white",
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <div className={styles.wrapperHeader}>
                        <div className={styles.headerNavElementBurger}>
                            <IconButton onClick={switchMainMenu}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <div>
                            <Link href="/">
                                <Image
                                    className={styles.logo}
                                    style={{ backgroundSize: "contain" }}
                                    src={logo}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className={styles.headerNavElement}>
                            <PositionedMenu
                                title="Каталог"
                                menuItemList={[
                                    {
                                        name: "Пиво",
                                        icon: <SportsBarIcon />,
                                        onClick: () => {
                                            router.replace("/products/beers");
                                        },
                                    },
                                    {
                                        name: "Снеки",
                                        icon: <IcecreamIcon />,
                                        onClick: () => {
                                            router.replace("/products/snacks");
                                        },
                                    },
                                    {
                                        name: "Рыба",
                                        icon: <SetMealIcon />,
                                        onClick: () => {
                                            router.replace("/products/fish");
                                        },
                                    },
                                ]}
                                useButton={false}
                            />
                        </div>
                        <div className={styles.headerNavElement}>
                            <Typography variant="body1">
                                <Link
                                    className="link-redirect"
                                    href="/contacts"
                                >
                                    Контакты
                                </Link>
                            </Typography>
                        </div>
                        <div className={styles.headerNavElement}>
                            <Typography variant="body1">
                                <Link
                                    className="link-redirect"
                                    href="/about-us"
                                >
                                    О нас
                                </Link>
                            </Typography>
                        </div>

                        <div className={styles.headerNavElementContacts}>
                            <a
                                className={styles.phoneLink}
                                href={"tel:" + phone}
                            >
                                <div className={styles.wrapperIcons}>
                                    <PhonelinkRingIcon />
                                    <Typography>{phone}</Typography>
                                </div>
                            </a>
                            <div>
                                <Typography>
                                    <a
                                        className={styles.phoneLink}
                                        href={linkForAddress}
                                        target="blank"
                                    >
                                        {address}
                                    </a>
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.wrapperIcons}>
                            <a
                                className={styles.vkIcon}
                                href={socialNetworkLink}
                                target="blank"
                            >
                                <Image
                                    style={{
                                        backgroundSize: "contain",
                                        height: "36px",
                                        width: "37px",
                                    }}
                                    src={vkIcon}
                                    alt="vk icon"
                                />
                            </a>
                            
                            {checkRoleUser("ADMIN") && (
                                <div>
                                    <Link href="/admin/main">
                                        <IconButton>
                                            <AdminPanelSettingsIcon
                                                style={{
                                                    height: "30px",
                                                    width: "30px",
                                                }}
                                            />
                                        </IconButton>
                                    </Link>
                                </div>
                            )}

                            <div>
                                <Link href="/account/profile">
                                    <IconButton>
                                        <FaceIcon
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                            }}
                                        />
                                    </IconButton>
                                </Link>
                            </div>
                            <div>
                                <CartBadge quantity={countProducts}></CartBadge>
                            </div>
                        </div>
                    </div>
                    </div>
                </AppBar>
            </Box>
        </header>
    );
};

export default Header;
