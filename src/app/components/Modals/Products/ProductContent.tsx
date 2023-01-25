import { FC, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useRouter } from "next/router";
import { useActions } from "../../../hooks/useActions";
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
    buy: (quantity: number) => void;
}

const ProductContent: FC<IProductContent> = ({
    id,
    listInfo,
    description,
    image,
    inStock,
    buy,
}) => {
    const { list } = useAppSelector((state) => state.basketReducer);
    const [inBasket, setProductInBasket] = useState(false);
    const [isBuyBtnClick, clickBuyBtn] = useState(false);

    const router = useRouter();
    const { closeProduct } = useActions();

    const findItemInBasket = (id: number) => {
        const items = list.filter((item) => {
            if (item.id === id) {
                return item;
            }
            return false;
        });

        if (items.length <= 0) {
            return false;
        }

        return items[0];
    };

    const handleBuy = () => {
        clickBuyBtn(true);
        setTimeout(() => {
            clickBuyBtn(false);
        }, 5000);
        
        if (inBasket) {
            router.replace('/basket');
            closeProduct();
        } else {
            setProductInBasket(true);
            buy(1);
        }
    };

    useEffect(() => {
        const productInBasket = findItemInBasket(id);
        if (productInBasket) {
            setProductInBasket(true);
        } else {
            setProductInBasket(false);
        }
    }, []);

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
                            onClick={handleBuy}
                        >
                            {inBasket ? "Перейти в корзину": "Добавить корзину"}
                        </Button>
                    </div>
                </div>

                <div className={styles.modalBeerInfo}>
                    {listInfo.map((item) => {
                        return (
                            <Typography variant="body1">
                                <span className={styles.labelInfo}>
                                    {item.key}:
                                </span>
                                {" "+item.value}
                            </Typography>
                        );
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
