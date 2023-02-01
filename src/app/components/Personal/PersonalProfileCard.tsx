import React, { FC, useRef, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { logout } from "../../store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/profile.module.css";
import ModeIcon from "@mui/icons-material/Mode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifyPhoneModal from "../Modals/Personal/VerifyPhoneModal";

const PersonalProfileCard: FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    const ref = useRef();
    const { resetBasket, setLoginPhone } = useActions();
    const dispatch = useDispatch();

    const [isOpenVerifyModal, openVerifyModal] = useState(false);

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

    const handleCloseVerifyModal = () => {
        openVerifyModal(false);
    };

    const handleOpenVerifyModal = () => {
        openVerifyModal(true);
    }

    return (
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
                            <Button size="small" style={{ marginLeft: "-6px" }}>
                                Сменить пароль
                            </Button>
                            <div className={styles.flexWrap}>
                                <Typography
                                    variant="body1"
                                    className={styles.personElement}
                                >
                                    <span className={styles.personLabel}>
                                        Телефон:
                                    </span>{" "}
                                    {"+" + user.phone}
                                </Typography>
                                <ModeIcon className={styles.modeIcon} onClick={handleOpenVerifyModal}/>
                            </div>
                            <div className={styles.flexWrap}>
                                <Typography
                                    variant="body1"
                                    className={styles.personElement}
                                >
                                    <span className={styles.personLabel}>
                                        Email:
                                    </span>{" "}
                                    {user.email ? user.email : "Не заполнен"}
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
            <VerifyPhoneModal
                modalProps={{
                    open: isOpenVerifyModal,
                    title: "Изменение номера телефона",
                    setClose: handleCloseVerifyModal,
                }}
            />
        </div>
    );
};

export default PersonalProfileCard;
function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
