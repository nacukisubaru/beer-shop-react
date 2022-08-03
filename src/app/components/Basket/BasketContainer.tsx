import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import BasketList from "./BasketList";

interface BasketContainerProps {}

const BasketContainer: FC<BasketContainerProps> = () => {
    const {list, count} = useAppSelector((state) => state.basketReducer);

    return <BasketList basketList={list} count={count} />;
};

export default BasketContainer;
