import React, { FC } from "react";
import "./css/basket.css";
import BasketCard from "./BaskerCard";
import { IProductСharacteristics } from "../../types/product.types";
import TotalCard from "./TotalCard";

interface BasketListProps {
    basketList: IProductСharacteristics[];
}

const BasketList: FC<BasketListProps> = ({basketList}) => {
    const total:any = basketList.reduce((previousValue:any, currentValue: any) => {
        return previousValue.price + currentValue.price;
    });

    return (
        <>
            <div className="wrapper-basket-list">
                <div className="container-basket-list">
                    {basketList.map((item: IProductСharacteristics) => (
                        <BasketCard
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            characteristics={item.characteristics}
                            img={item.img}
                        />
                    ))}
                </div>
                <div className="basket-total-card">
                    <TotalCard totalPrice={total}/>
                </div>   
            </div>
        </>
    );
};

export default BasketList;
