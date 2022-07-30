import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import BasketList from "./BasketList";

interface BasketContainerProps {}

const BasketContainer: FC<BasketContainerProps> = () => {
   const basket = useAppSelector(state => state.basketReducer.list);

    return (<BasketList basketList={basket}/>);
}

export default BasketContainer;