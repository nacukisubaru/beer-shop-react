import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useOrder } from "../../hooks/useOrder";
import BasketList from "./BasketList";

interface BasketContainerProps {}

const BasketContainer: FC<BasketContainerProps> = () => {
    const {list, count} = useAppSelector((state) => state.basketReducer);
    const {create} = useOrder();
    
    return <BasketList basketList={list} count={count} order={create} />;
};

export default BasketContainer;
