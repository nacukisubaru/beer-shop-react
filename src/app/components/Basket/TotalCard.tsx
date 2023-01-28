import React, { FC } from "react";
import { Button, Card, Checkbox, Container, Typography } from "@mui/material";
import styles from "./styles/basket.module.css";
import HTMLReactParser from "html-react-parser";
import { decodeHtml } from "../../helpers/stringHelper";
import { CheckBox } from "@mui/icons-material";

interface ICardProps {
    position: string;
}

interface ITotalCard {
    totalPrice: number;
    cardProps: ICardProps;
    consentText?: string;
    order: () => void;
}

const TotalCard: FC<ITotalCard> = ({
    totalPrice,
    cardProps,
    consentText,
    order,
}) => {
    return (
        <>
            <Card
                sx={{
                    width: 350,
                    marginTop: "49px",
                    height: consentText ? "290px" : "250px",
                    position: cardProps.position,
                    borderRadius: "32px",
                    marginLeft: "7px",
                }}
            >
                <div className={styles.totalCard}>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Итого
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {totalPrice} &#8381;
                    </Typography>
                </div>
                <div className={styles.totalCardDetails}>
                    <Typography
                        variant="body2"
                        style={{
                            display: "flex",
                            marginBottom: "50px",
                        }}
                    >
                        Ежедневно с 12:00 до 22:00 г Калуга, Улица Братьев
                        Луканиных 7
                    </Typography>
                    <Button
                        sx={{ width: 259 }}
                        onClick={order}
                        variant="contained"
                    >
                        Заказать
                    </Button>
                    {consentText && (
                        <>
                            <div style={{display: "flex"}}>
                                <CheckBox sx={{marginTop: "14px", marginRight: "5px", color: "#b15122"}}/>
                              
                                {HTMLReactParser(decodeHtml(consentText))}
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </>
    );
};

export default TotalCard;
