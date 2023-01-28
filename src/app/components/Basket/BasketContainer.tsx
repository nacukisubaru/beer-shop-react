import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useOrder } from "../../hooks/useOrder";
import BasketList from "./BasketList";

interface BasketContainerProps {
    consentText?: string
}

const BasketContainer: FC<BasketContainerProps> = ({consentText}) => {
    const {list, count} = useAppSelector((state) => state.basketReducer);
    const {create} = useOrder();
    
    return <BasketList basketList={list} count={count} consentText={consentText} order={create} />;
};

export default BasketContainer;
