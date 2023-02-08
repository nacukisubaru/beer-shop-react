import React, { FC, useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { logout } from "../../store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./styles/profile.module.css";
import ModeIcon from "@mui/icons-material/Mode";
import PersonalVerifyPhone from "./PersonalVerifyPhone";
import PersonalChangePhone from "./PersonalChangePhone";
import ProfileChangeFields from "./ProfileChangeFields";
import AvatarProfile from "./AvatarProfile";

type field = "email" | "фио" | "пароль";

const PersonalProfileCard: FC = () => {
    const { user, isVerifyPhone } = useAppSelector(
        (state) => state.userReducer
    );
    const { resetBasket, setLoginPhone } = useActions();
    const dispatch = useDispatch();
    const [isOpenVerifyModal, openVerifyModal] = useState(false);
    const [isOpenChangePhoneModal, openChangePhoneModal] = useState(false);
    const [isOpenChangeProfileField, openChangeProfileField] = useState(false);
    const [changeableField, setChangeableField] = useState<field>("email");
    const [changeableValue, setChangeableValue] = useState("");

    const handleLogout = async () => {
        await setLoginPhone({ phone: "" });
        await dispatch(logout());
        resetBasket();
        localStorage.clear();
    };

    const handleCloseVerifyModal = () => {
        openVerifyModal(false);
    };

    const handleOpenVerifyModal = () => {
        if (isVerifyPhone) {
            openChangePhoneModal(true);
        } else {
            openVerifyModal(true);
        }
    };

    const handleCloseChangePhoneModal = () => {
        openChangePhoneModal(false);
    };

    const handleOpenChangePhoneModal = () => {
        openChangePhoneModal(true);
    };

    const handleCloseChangeProfileField = () => {
        openChangeProfileField(false);
    };

    const handleOpenChangeProfileEmail = () => {
        setChangeableField("email");
        setChangeableValue(user.email);
        openChangeProfileField(true);
    };

    const handleOpenChangeFio = () => {
        setChangeableField("фио");
        setChangeableValue(user.fio);
        openChangeProfileField(true);
    };

    const handleOpenChangePassword = () => {
        setChangeableField("пароль");
        setChangeableValue("");
        openChangeProfileField(true);
    };

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
                        <AvatarProfile avatar={user.avatar}/>
                        <div className={styles.flexWrap}>                       
                            <>
                                <Typography
                                    variant="h5"
                                    className={styles.personElement}
                                    style={{
                                        marginTop: "14px",
                                        marginLeft: "17px",
                                    }}
                                >
                                    <span style={{ width: "201px" }}>
                                        {user.fio ? user.fio : "Не заполнено"}
                                    </span>
                                </Typography>
                                <ModeIcon
                                    className={styles.modeIcon}
                                    style={{ marginTop: "22px" }}
                                    onClick={handleOpenChangeFio}
                                />
                            </>
                        </div>
                    </div>

                    <div className={styles.personWrapper}>
                        <div>
                            <Button
                                size="small"
                                style={{ marginLeft: "-6px" }}
                                onClick={handleOpenChangePassword}
                            >
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
                                <ModeIcon
                                    className={styles.modeIcon}
                                    onClick={handleOpenVerifyModal}
                                />
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
                                <ModeIcon
                                    className={styles.modeIcon}
                                    onClick={handleOpenChangeProfileEmail}
                                />
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
            <PersonalVerifyPhone
                modalProps={{
                    open: isOpenVerifyModal,
                    title: "Изменение номера телефона",
                    setClose: handleCloseVerifyModal,
                }}
                verifyProps={{
                    verifyNewPhone: false,
                    verifyAction: handleOpenChangePhoneModal,
                }}
            />
            <PersonalChangePhone
                modalProps={{
                    open: isOpenChangePhoneModal,
                    setClose: handleCloseChangePhoneModal,
                }}
            />
            <ProfileChangeFields
                modalProps={{
                    open: isOpenChangeProfileField,
                    setClose: handleCloseChangeProfileField,
                }}
                changeFieldsProps={{
                    field: changeableField,
                    currentValue: changeableValue,
                }}
            />
        </div>
    );
};

export default PersonalProfileCard;
