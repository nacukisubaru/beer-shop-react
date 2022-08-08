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
    
    const initialValue = 0;
    const total:any =  basketList.length > 0 ? basketList.reduce((accumulator, currentValue: any) => {
        return accumulator + currentValue.price * currentValue.quantity;
    }, initialValue): 0;

    return (
        <>
            <div className="wrapper-basket-list">
                <div className="container-basket-list">
                    {basketList.map((item: IProductСharacteristics, index: number) => (
                        <BasketCard
                            key={index}
                            id={item.id}
                            index={index}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            characteristics={item.characteristics}
                            image={item.image} 
                            description={item.description} />
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
