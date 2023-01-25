import React, { FC, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { IProductBasket } from "../../types/product.types";
import { useBasket } from "../../hooks/useBasket";
import BasketCard from "./BasketCard";
import TotalCard from "./TotalCard";
import Link from "next/link";
import ProductNotInStock from "../Modals/Messages/ProductNotInStock";
import SuccessOrder from "../Modals/Messages/SuccessOrder";
import styles from "./styles/basket.module.css";

interface BasketListProps {
    basketList: IProductBasket[];
    count: number;
    order: () => void;
}

const BasketList: FC<BasketListProps> = ({ basketList, order, count }) => {
    const initialValue = 0;
    const total: any =
        basketList.length > 0
            ? basketList.reduce((accumulator, currentValue: any) => {
                  return (
                      accumulator + currentValue.price * currentValue.quantity
                  );
              }, initialValue)
            : 0;

    const { getBasket } = useBasket();

    useEffect(() => {
        getBasket();
    }, []);

    return (
        <div className={styles.wrapperBasketList}>
            <div className={styles.containerBasketList}>
                {basketList.map((item: IProductBasket, index: number) => (
                    <>
                        <BasketCard
                            key={index}
                            id={item.id}
                            index={index}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            inStock={item.inStock}
                            //characteristics={item.characteristics}
                            image={item.image}
                            description={item.description}
                        />
                    </>
                ))}
                {basketList.length > 0 && (
                    <div className={styles.basketTotalCardMobile}>
                        <TotalCard
                            totalPrice={total}
                            order={order}
                            cardProps={{ position: "inherit" }}
                        />
                    </div>
                )}
            </div>

            {basketList.length > 0 ? (
                <div className={styles.basketTotalCard}>
                    <TotalCard
                        totalPrice={total}
                        order={order}
                        cardProps={{ position: "fixed" }}
                    />
                </div>
            ) : (
                <div>
                    <Typography className={styles.emptyBasket}>
                        Ваша корзина пуста
                    </Typography>

                    <Link
                        href={"/products/beers"}
                        style={{ textDecoration: "none" }}
                    >
                        <Button variant="contained" fullWidth>
                            Посмотреть каталог
                        </Button>
                    </Link>
                </div>
            )}
            <ProductNotInStock />
            <SuccessOrder />
        </div>
    );
};

export default BasketList;
