import React, { FC } from "react";
import "./css/basket.css";
import BasketCard from "./BaskerCard";
import { IProductBasket } from "../../types/product.types";
import TotalCard from "./TotalCard";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useBasket } from "../../hooks/useBasket";

interface BasketListProps {
    basketList: IProductBasket[];
    count: number
}

const BasketList: FC<BasketListProps> = ({basketList, count}) => {
    
    const initialValue = 0;
    const total:any =  basketList.length > 0 ? basketList.reduce((accumulator, currentValue: any) => {
        return accumulator + currentValue.price * currentValue.quantity;
    }, initialValue): 0;

    const {getBasketByUser} = useBasket();

    const handlerGetBasket = () => {
        getBasketByUser(7);
    }

    return (
        <>
            <Button onClick={handlerGetBasket}>нажми</Button>
            <div className="wrapper-basket-list">
                <div className="container-basket-list">
                    {basketList.map((item: IProductBasket, index: number) => (
                        <BasketCard
                            key={index}
                            id={item.id}
                            index={index}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            //characteristics={item.characteristics}
                            image={item.image} 
                            description={item.description} />
                    ))}
                </div>
                {basketList.length > 0 ? (
                    <div className="basket-total-card">
                        <TotalCard totalPrice={total}/>
                    </div>   
                ): (
                    <div>
                        <div className="empty-basket">Ваша корзина пуста</div>
                        <div>
                            <Link to={'/products/beers'} style={{textDecoration: 'none'}}>
                                <Button variant="contained">Посмотреть каталог</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BasketList;
