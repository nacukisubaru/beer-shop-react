import { Box, Button, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import { ICard } from "../../types/card.types";
import styles from "./styles/cards.module.css";

interface ICardSmall extends ICard {
    show: (id: number) => void;
}

const useStyles = makeStyles({
    titleText: {
        fontWeight: "bold",
        fontSize: "18px",
        display: "flex",
        justifyContent: "center",
    },
    priceText: {
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
    },
    stockText: {
        marginTop: "-20px",
        color: "#8d8d8d",
    },
    card: {
        width: 300,
        height: 390,
        margin: "10px",
        borderRadius: "15px",
        paddingTop: "36px",
    },
    cardImg: {
        height: "200px",
        marginBottom: "5px",
        position: "relative",
        backgroundSize: "contain",
    },
    button: {
        width: "279px",
        height: "30px",
    },
    buttonBottom: {
        width: "279px",
        marginBottom: "5px",
        height: "30px",
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
        height: "39px",
        display: "flex",
        justifyContent: "center",
    },
});

const CardSmall: FC<ICardSmall> = ({
    id,
    title,
    description,
    price,
    image,
    inStock,
    buy,
    show,
}) => {
    const classes = useStyles();
    const handleShow = () => {
        return show(id);
    };

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
