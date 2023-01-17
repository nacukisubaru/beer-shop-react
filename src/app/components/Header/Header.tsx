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

const Header: FC = () => {
    const countProducts: number = useAppSelector(
        (state) => state.basketReducer.count
    );
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
                                        onClick: () => {},
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
                            <Typography variant="body1">О нас</Typography>
                        </div>

                        <div className={styles.headerNavElementContacts}>
                            <a
                                className={styles.phoneLink}
                                href="tel:+7 920 899 77 72"
                            >
                                <div className={styles.wrapperIcons}>
                                    <PhonelinkRingIcon />
                                    <Typography> +7 920 899 77 72 </Typography>
                                </div>
                            </a>
                            <div>
                                <Typography>
                                    <a
                                        className={styles.phoneLink}
                                        href="https://2gis.ru/kaluga/firm/70000001036699976"
                                        target="blank"
                                    >
                                        ул. Братьев Луканиных, 7, Калуга
                                    </a>
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.wrapperIcons}>
                            <a
                                className={styles.vkIcon}
                                href="https://vk.com/id474817801"
                                target="blank"
                            >
                                <Image
                                    style={{
                                        backgroundSize: "contain",
                                        height: "36px",
                                        width: "37px",
                                    }}
                                    src={vkIcon}
                                />
                            </a>
                            <div>
                                <IconButton>
                                    <RoomIcon
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                        }}
                                    />
                                </IconButton>
                            </div>
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
                                <Link href="/account">
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
                </AppBar>
            </Box>
        </header>
    );
};

export default Header;
