import React, { FC } from "react";
import "./css/basket.css";
import BasketCard from "./BaskerCard";
import { IProductСharacteristics } from "../../types/product.types";

interface BasketListProps {
    basketList: IProductСharacteristics[];
}

const BasketList: FC<BasketListProps> = ({basketList}) => {
    return (
        <>
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
        </>
    );
};

export default BasketList;
