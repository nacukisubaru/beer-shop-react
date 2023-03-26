import { Box, Button, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
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
                style={{
                    width: card.width,
                    height: card.height,
                    margin: "10px",
                    borderRadius: "15px",
                    paddingTop: "36px",
                    boxShadow:
                        "0px 2px 12px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                }}
            >
                <div
                    className={
                        inStock
                            ? styles.cardContent
                            : styles.cardContentNoActive
                    }
                >
                    <div style={{ maxHeight: "200px" }}>
                        <Link href={detailUrl}>
                            <Box
                                className={styles.cardImg}
                                sx={{
                                    background: `url(${image}) center center no-repeat`,
                                    backgroundSize: "contain",
                                    position: "relative",
                                    marginBottom: "5px",
                                    height: imageHeight
                                }}
                            ></Box>
                        </Link>
                    </div>
                    <Link href={detailUrl}>
                        <div className={styles.titleText}>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: titleSize,
                                    fontWeight: "bold",
                                }}
                            >
                                {title}
                            </Typography>
                        </div>
                    </Link>

                    <Link href={detailUrl}>
                        <div className={styles.cardContentDesc}>
                            <Typography variant="body2">
                                {description}
                            </Typography>
                        </div>
                    </Link>

                    <Link href={detailUrl}>
                        <div className={styles.cardContentPrice}>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: priceSize,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
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
