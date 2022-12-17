import React, { FC } from "react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IProductBasket } from "../../types/product.types";
import { useActions } from "../../hooks/useActions";
import { useBasket } from "../../hooks/useBasket";
import { makeStyles } from "@mui/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/basket.module.css";

interface IBasketCard extends IProductBasket {
    index: number;
}

const useStyles = makeStyles({
    image: {
        backgroundSize: "contain",
        height: "150px",
    },
    elementCenter: {
        display: "flex",
        justifyContent: "center",
    },
    titleText: {
        display: "flex",
        justifyContent: "center",
        fontSize: "17px",
        marginBottom: "10px",
        fontWeight: "bold",
    },
    descText: {
        display: "flex",
        justifyContent: "center",
        fontSize: "15px",
        marginBottom: "10px",
    },
});

const BasketCard: FC<IBasketCard> = ({
    id,
    index,
    title,
    price,
    quantity,
    image,
    description,
    inStock,
}) => {
    const classes = useStyles();
    const { plusQuantity, minusQuantity, removeItem } = useActions();
    const { remove, update } = useBasket();

    const handlerPlusQuan = async () => {
        await plusQuantity({ id, value: 1 });
        update(id, quantity + 1);
    };

    const handlerMinusQuan = async () => {
        await minusQuantity({ id, value: 1 });
        update(id, quantity - 1);
    };

    const handleRemove = () => {
        remove(id);
        return removeItem({ id });
    };

    return (
        <div className={styles.container} key={index}>
            <div className={styles.wrapper}>
                <div className={styles.basketContainer}>
                    <div className={styles.basketElement}>
                        <Box
                            className={classes.image}
                            sx={{
                                background: `url(${image}) center center no-repeat `,
                            }}
                        ></Box>
                    </div>
                    <div
                        className={
                            styles.basketElement +
                            " " +
                            styles.productInfoWrapper
                        }
                    >
                        <span
                            className={
                                !inStock
                                    ? styles.crossedOutText +
                                      " " +
                                      styles.disableText
                                    : ""
                            }
                        >
                            <Typography
                                variant="h4"
                                className={classes.titleText}
                            >
                                {title}
                            </Typography>
                        </span>
                        <div
                            className={
                                inStock
                                    ? styles.description +
                                      " " +
                                      classes.descText
                                    : styles.description +
                                      " " +
                                      " " +
                                      classes.descText +
                                      " " +
                                      styles.disableText
                            }
                        >
                            <Typography variant="body2">
                                {inStock ? description : "Нет в наличии"}
                            </Typography>
                        </div>
                    </div>
                    <div
                        style={{ paddingTop: "45px" }}
                        className={styles.basketElement}
                    >
                        <div
                            className={
                                inStock
                                    ? styles.basketQuantity
                                    : styles.basketQuantity +
                                      " " +
                                      styles.disableText
                            }
                        >
                            <RemoveCircleOutlineIcon
                                style={{ cursor: "pointer" }}
                                onClick={handlerMinusQuan}
                            />
                            <Typography variant="body1">{quantity}</Typography>
                            <AddCircleOutlineIcon
                                style={{ cursor: "pointer" }}
                                onClick={handlerPlusQuan}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            inStock
                                ? styles.basketElement +
                                  " " +
                                  styles.basketPrice
                                : styles.basketElement +
                                  " " +
                                  styles.basketPrice +
                                  " " +
                                  styles.disableText
                        }
                    >
                        <Typography
                            className={classes.elementCenter}
                            variant="h6"
                        >
                            {price * quantity} ₽
                        </Typography>
                        <div className={classes.elementCenter}>
                            <IconButton onClick={handleRemove}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketCard;
