import React, { FC, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { IProductBasket } from "../../types/product.types";
import { useBasket } from "../../hooks/useBasket";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useRouter } from "next/router";
import BasketCard from "./BasketCard";
import TotalCard from "./TotalCard";
import Link from "next/link";
import ProductNotInStock from "../Modals/Messages/ProductNotInStock";
import SuccessOrder from "../Modals/Messages/SuccessOrder";
import styles from "./styles/basket.module.css";
import BasicModal from "../Modals/BasicModal";
import { useActions } from "../../hooks/useActions";

interface BasketListProps {
    consentText?: string;
    basketList: IProductBasket[];
    count: number;
    order: () => void;
}

const BasketList: FC<BasketListProps> = ({ basketList, consentText, order, count }) => {
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
    const {isRegisteredNow} = useAppSelector((state) => state.userReducer);
    const {backRedirectToOrder} = useAppSelector(state => state.orderReducer);
    const router = useRouter();
    const {setRegisteredNow} = useActions();
    const [isOpenLkModal, setOpenLkModal] = useState(backRedirectToOrder && isRegisteredNow ? true : false);

    const handleNavigate = async () => {
        await setRegisteredNow({isReg: false});   
        router.replace('/account/');
    }

    const handleCloseLkModal = () => {
        setOpenLkModal(false);
        setRegisteredNow({isReg: false});
    }

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
                            consentText={consentText}
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
                        consentText={consentText}
                    />
                </div>
            ) : (
                <div>
                    <div className={styles.emptyBasket}> 
                        <Typography variant="h4">
                            Ваша корзина пуста
                        </Typography>
                    </div>

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
            <BasicModal
                open={isOpenLkModal}
                body={
                    <>
                    <Typography style={{marginBottom: "15px"}}>
                        Рекомендуем перейти в личный кабинет и заполнить email в профиле вам придет уведомление на почту о том что ваш заказ готов.
                        Также рекомендуем заполнить ваше имя, чтобы мы знали как к вам обращаться.
                    </Typography>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button variant="contained" onClick={handleNavigate}>Личный кабинет</Button>
                    </div>
                    </>
                }
                title="Рекомендуем заполнить профиль"
                showOkBtn={false}
                width={"xs"}
                setClose={handleCloseLkModal}
            />
        </div>
    );
};

export default BasketList;