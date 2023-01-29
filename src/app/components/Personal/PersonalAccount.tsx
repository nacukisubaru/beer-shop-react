import React, { FC, useRef } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { logout } from "../../store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faBagShopping,
    faCamera,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/profile.module.css";
import Link from "next/link";
import ModeIcon from "@mui/icons-material/Mode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PersonalAccount: FC = () => {
    const dispatch = useDispatch();
    const { user } = useAppSelector((state) => state.userReducer);
    const { resetBasket, setLoginPhone } = useActions();
    const ref = useRef();
    console.log({ user });
    const handleLogout = async () => {
        await setLoginPhone({ phone: "" });
        await dispatch(logout());
        resetBasket();
        localStorage.clear();
    };

    const onEnterShowPhotoIcon = () => {
        ref.current.style.display = "block";
    };

    const onLeaveHidePhotoIcon = () => {
        ref.current.style.display = "none";
    };

    const loadAvatar = () => {};

    return (
        <div style={{ margin: "55px" }}>
            <div className={styles.wrapperLk}>
                <div className={styles.cardWrapperLk}>
                    <Card className={styles.cardLk}>
                        <div style={{ margin: "32px" }}>
                            <div
                                className={styles.personWrapper}
                                style={{
                                    marginTop: "16px",
                                }}
                            >
                                <span ref={ref} style={{ display: "none" }}>
                                    <FontAwesomeIcon
                                        className={styles.addPhotoIcon}
                                        icon={faCamera}
                                    />
                                </span>
                                <div
                                    className={styles.avatar}
                                    onMouseEnter={onEnterShowPhotoIcon}
                                    onMouseLeave={onLeaveHidePhotoIcon}
                                    onClick={loadAvatar}
                                >
                                    {user.avatar ? (
                                        <Box
                                            sx={{
                                                background: `url(${user.avatar}) center center no-repeat`,
                                                height: 80,
                                                width: 80,
                                                backgroundSize: "contain",
                                                borderRadius: "38px",
                                            }}
                                        ></Box>
                                    ) : (
                                        <AccountCircleIcon
                                            className={styles.avatarIcon}
                                            style={{
                                                fontSize: "5em",
                                                color: "#b05326",
                                            }}
                                        />
                                    )}
                                </div>
                                <div className={styles.flexWrap}>
                                    <Typography
                                        variant="h5"
                                        className={styles.personElement}
                                        style={{
                                            marginTop: "14px",
                                            marginLeft: "17px",
                                        }}
                                    >
                                        <span style={{ width: "201px" }}>
                                            {user.name}
                                        </span>
                                    </Typography>
                                    <ModeIcon
                                        className={styles.modeIcon}
                                        style={{ marginTop: "22px" }}
                                    />
                                </div>
                            </div>

                            <div className={styles.personWrapper}>
                                <div>
                                    <Button
                                        size="small"
                                        style={{ marginLeft: "-6px" }}
                                    >
                                        Сменить пароль
                                    </Button>
                                    <div className={styles.flexWrap}>
                                        <Typography
                                            variant="body1"
                                            className={styles.personElement}
                                        >
                                            <span
                                                className={styles.personLabel}
                                            >
                                                Телефон:
                                            </span>{" "}
                                            {"+" + user.phone}
                                        </Typography>
                                        <ModeIcon className={styles.modeIcon} />
                                    </div>
                                    <div className={styles.flexWrap}>
                                        <Typography
                                            variant="body1"
                                            className={styles.personElement}
                                        >
                                            <span
                                                className={styles.personLabel}
                                            >
                                                Email:
                                            </span>{" "}
                                            {user.email
                                                ? user.email
                                                : "Не заполнен"}
                                        </Typography>
                                        <ModeIcon className={styles.modeIcon} />
                                    </div>
                                </div>
                                <Button
                                    className={styles.logoutBtn}
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                <Link className={styles.personLink} href="/account/orders">
                    <div className={styles.cardWrapperLk}>
                        <Card className={styles.cardLk}>
                            <div className={styles.cardContentWrap}>
                                <FontAwesomeIcon
                                    className={styles.cardIcon}
                                    icon={faBagShopping}
                                />
                                <Typography
                                    variant="h5"
                                    className={styles.personLink}
                                    style={{ marginTop: "23px" }}
                                >
                                    Мои заказы
                                </Typography>
                            </div>
                        </Card>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PersonalAccount;
