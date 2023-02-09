import React, { FC } from "react";
import { Card, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/profile.module.css";
import Link from "next/link";
import PersonalProfileCard from "./PersonalProfileCard";

const PersonalAccount: FC = () => {
    return (
        <div style={{ margin: "55px" }}>
            <div className={styles.wrapperLk}>
                <PersonalProfileCard />
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
