import { Box, Button, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import { ICard } from "../../types/card.types";
import styles from "./styles/cards.module.css";

interface IBox {
    width: string;
    height: string;
}

export interface ISettingsCard {
    card: IBox;
    titleSize: string;
    imageHeight: string;
    button: IBox;
    priceSize: string;
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
    const { card, button, titleSize, imageHeight, priceSize } =
        settingsCardProps;

    return (
        <>
            <Card
                className={styles.card}
                style={{
                    width: card.width,
                    height: card.height,
                }}
            >
                <div
                    className={
                        inStock
                            ? styles.cardContent
                            : styles.cardContentNoActive
                    }
                >
                    <Box
                        className={styles.cardImg}
                        sx={{
                            background: `url(${image}) center center no-repeat`,
                            height: imageHeight,
                        }}
                    ></Box>
                    <Typography
                        variant="body2"
                        className={styles.titleText}
                        style={{ fontSize: titleSize }}
                    >
                        {title}
                    </Typography>

                    <div className={styles.cardContentDesc}>
                        <Typography variant="body2">{description}</Typography>
                    </div>

                    <div className={styles.cardContentPrice}>
                        <Typography
                            variant="body2"
                            className={styles.priceText}
                            style={{ fontSize: priceSize }}
                        >
                            {price} &#x20bd;
                        </Typography>
                    </div>

                    {!inStock && (
                        <Typography
                            variant="body2"
                            className={styles.stockText}
                        >
                            Нет в наличии
                        </Typography>
                    )}

                    <Button
                        className={styles.buttonBottom}
                        style={{
                            width: button.width,
                            height: button.height,
                        }}
                        variant="contained"
                        disabled={inStock ? false : true}
                        onClick={buy}
                    >
                        Купить
                    </Button>
                    <Button
                        className={styles.button}
                        style={{
                            width: button.width,
                            height: button.height,
                        }}
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
