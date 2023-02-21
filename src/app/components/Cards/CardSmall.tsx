import { Box, Button, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ICard } from "../../types/card.types";
import styles from "./styles/cards.module.css";
import CustomSnackBar from "../CustomUI/CustomSnackBar/CustomSnackBar";
import Link from "next/link";

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
    showDetailBtn?: boolean;
}
interface ICardSmall extends ICard {
    settingsCardProps: ISettingsCard;
    inBasket: boolean;
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
    inBasket,
    detailUrl,
    buy,
    show,
}) => {
    const { card, button, titleSize, imageHeight, priceSize, showDetailBtn } =
        settingsCardProps;
    const [isBuyBtnClick, clickBuyBtn] = useState(false);
    const router = useRouter();

    const handleShow = () => {
        return show(id);
    };

    const handleBuy = () => {
        clickBuyBtn(true);
        setTimeout(() => {
            clickBuyBtn(false);
        }, 5000);

        if (inBasket) {
            router.replace("/basket");
        } else {
            buy();
        }
    };

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
                    <Link href={detailUrl}>
                        <Box
                            className={styles.cardImg}
                            sx={{
                                background: `url(${image}) center center no-repeat`,
                                height: imageHeight,
                            }}
                        ></Box>
                    </Link>
                    <Link href={detailUrl}>
                        <Typography
                            variant="body2"
                            className={styles.titleText}
                            style={{ fontSize: titleSize, fontWeight: "bold" }}
                        >
                            {title}
                        </Typography>
                    </Link>
                    
                    <Link href={detailUrl}>
                        <div className={styles.cardContentDesc}>
                            <Typography variant="body2">{description}</Typography>
                        </div>
                    </Link>
                    
                    <Link href={detailUrl}>
                        <div className={styles.cardContentPrice}>
                            <Typography
                                variant="body2"
                                className={styles.priceText}
                                style={{ fontSize: priceSize }}
                            >
                                {price} &#x20bd;
                            </Typography>
                        </div>
                    </Link>

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
                        variant={inBasket ? "outlined" : "contained"}
                        disabled={inStock ? false : true}
                        onClick={handleBuy}
                    >
                        {inBasket ? "В корзине" : "В корзину"}
                    </Button>
                    {showDetailBtn && (
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
                    )}
                </div>
            </Card>
            {router.route !== "/" && (
                <CustomSnackBar
                    severity="success"
                    message="Товар добавлен в корзину"
                    isOpen={isBuyBtnClick}
                />
            )}
        </>
    );
};

export default CardSmall;
