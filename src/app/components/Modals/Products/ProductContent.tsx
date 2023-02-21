import { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useBuyProduct } from "../../../hooks/useBuyProduct";
import { IProductBasket } from "../../../types/product.types";
import styles from "../styles/modal.module.css";
import CustomSnackBar from "../../CustomUI/CustomSnackBar/CustomSnackBar";

interface IListInfoItem {
    key: string;
    value: string;
}

interface IProductContent {
    id: number;
    listInfo: IListInfoItem[];
    description: string;
    image: string;
    inStock: boolean;
    productForBuy: IProductBasket
}

const ProductContent: FC<IProductContent> = ({
    id,
    listInfo,
    description,
    image,
    inStock,
    productForBuy
}) => {
    const {buyProduct, inBasket, isBuyBtnClick} = useBuyProduct(productForBuy);

    return (
        <>
            <div className={styles.modalBeerContent}>
                <div>
                    <Box
                        className={styles.modalBeerImg}
                        style={{ backgroundSize: "contain" }}
                        sx={{
                            background: `url(${image}) center center no-repeat`,
                        }}
                    ></Box>
                    <div className={styles.buyBtn}>
                        <Button
                            variant={inBasket ? "outlined": "contained"}
                            style={{ width: "200px" }}
                            disabled={inStock ? false : true}
                            onClick={buyProduct}
                        >
                            {inBasket ? "Перейти в корзину": "Добавить корзину"}
                        </Button>
                    </div>
                </div>

                <div className={styles.modalBeerInfo}>
                    {listInfo.map((item) => {
                        if (item.value) {
                            return (
                                <Typography variant="body1">
                                    <span className={styles.labelInfo}>
                                        {item.key}:
                                    </span>
                                    {" "+item.value}
                                </Typography>
                            );
                        }
                    })}
                </div>

                <div>
                    <Typography variant="body1">
                        <span className={styles.labelInfo}>Описание:</span>
                    </Typography>
                    <Typography variant="body1">
                        <div className={styles.modalBeerDesc}>
                            {description}
                        </div>
                    </Typography>
                </div>
            </div>
            <CustomSnackBar
                severity="success"
                message="Товар добавлен в корзину"
                isOpen={isBuyBtnClick}
            />
        </>
    );
};

export default ProductContent;
