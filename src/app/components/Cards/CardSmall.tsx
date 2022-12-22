import { Box, Button, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import { ICard } from "../../types/card.types";
import styles from "./styles/cards.module.css";

interface IBox {
    width: string,
    height: string
}

export interface ISettingsCard {
    card: IBox,
    titleSize: string,
    imageHeight: string,
    button: IBox,
    priceSize: string
}
interface ICardSmall extends ICard {
    settingsCardProps: ISettingsCard;
    show: (id: number) => void;
}

const CardSmall: FC<ICardSmall> = ({
    id,
    title,
    description,
    price,
    image,
    inStock,
    settingsCardProps,
    buy,
    show,
}) => {
    const handleShow = () => {
        return show(id);
    };
    const {card, button, titleSize, imageHeight, priceSize} = settingsCardProps;

    const useStyles = makeStyles({
        titleText: {
            fontWeight: "bold",
            fontSize: titleSize,
            display: "flex",
            justifyContent: "center",
        },
        priceText: {
            fontSize: priceSize,
            display: "flex",
            justifyContent: "center",
        },
        stockText: {
            marginTop: "-20px",
            color: "#8d8d8d",
            display: "flex",
            justifyContent: "center",
        },
        card: {
            width: card.width,
            height:  card.height,
            margin: "10px",
            borderRadius: "15px",
            paddingTop: "36px",
        },
        cardImg: {
            marginBottom: "5px",
            height: imageHeight,
            position: "relative",
            backgroundSize: "contain",
        },
        button: {
            width: button.width,
            height: button.height,
        },
        buttonBottom: {
            width: button.width,
            marginBottom: "5px",
            height: button.height,
        },
        cardContent: {
            paddingLeft: "10px",
            paddingRight: "10px",
        },
        cardContentNoActive: {
            paddingLeft: "10px",
            paddingRight: "10px",
            color: "#8d8d8d",
        },
        cardContentDesc: {
            display: "-webkit-box",
            maxidth: "285px",
            webkitLineClamp: 2,
            webkitBoxOrient: "vertical",
            overflow: "hidden",
            height: "32px",
            display: "flex",
            justifyContent: "center",
        },
    });

    const classes = useStyles();

    return (
        <>
            <Card className={classes.card}>
                <div
                    className={
                        inStock
                            ? classes.cardContent
                            : classes.cardContentNoActive
                    }
                >
                    <Box
                        className={classes.cardImg}
                        sx={{
                            background: `url(${image}) center center no-repeat`,
                        }}
                    ></Box>
                    <Typography variant="body2" className={classes.titleText}>
                        {title}
                    </Typography>

                    <div className={classes.cardContentDesc}>
                        <Typography variant="body2">{description}</Typography>
                    </div>

                    <div className={styles.cardContentPrice}>
                        <Typography
                            variant="body2"
                            className={classes.priceText}
                        >
                            {price} &#x20bd;
                        </Typography>
                    </div>

                    {!inStock && (
                        <Typography
                            variant="body2"
                            className={classes.stockText}
                        >
                            Нет в наличии
                        </Typography>
                    )}

                    <Button
                        className={classes.buttonBottom}
                        style={{width: "", height: ""}}
                        variant="contained"
                        disabled={inStock ? false : true}
                        onClick={buy}
                    >
                        Купить
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        onClick={handleShow}
                    >
                        Детально
                    </Button>
                </div>
            </Card>
        </>
    );
};

export default CardSmall;
