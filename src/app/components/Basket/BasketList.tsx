import React, { FC } from "react";
import "./css/basket.css";
import BasketCard from "./BaskerCard";
import { IProductСharacteristics } from "../../types/product.types";
import TotalCard from "./TotalCard";

interface BasketListProps {
    basketList: IProductСharacteristics[];
    count: number
}

const BasketList: FC<BasketListProps> = ({basketList, count}) => {
    
    const prices = basketList.length > 0 ? basketList.map((item) => {
        return item.price;
    }) : 0;

    const total:any = prices ? prices.reduce((previousValue:any, currentValue: any) => {
        return previousValue + currentValue;
    }): 0;

    return (
        <>
            <div className="wrapper-basket-list">
                <div className="container-basket-list">
                    {basketList.map((item: IProductСharacteristics, index: number) => (
                        <BasketCard
                            id={item.id}
                            index={index}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            characteristics={item.characteristics}
                            img={item.img}
                        />
                    ))}
                </div>
                <div className="basket-total-card">
                    <TotalCard totalPrice={total * count}/>
                </div>   
            </div>
        </>
    );
};

export default BasketList;
