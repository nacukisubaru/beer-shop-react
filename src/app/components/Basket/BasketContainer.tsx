import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getBasketList } from "../../store/services/basket/reducers/basket.slice";
import BasketList from "./BasketList";

interface BasketContainerProps {}

const BasketContainer: FC<BasketContainerProps> = () => {
    const {list, count} = useAppSelector((state) => state.basketReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const basketId = localStorage.getItem("basketId");
        if(basketId) {
            dispatch(getBasketList(basketId));
        }
    }, []);

    return <BasketList basketList={list} count={count} />;
};

export default BasketContainer;
