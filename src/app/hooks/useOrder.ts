
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getBasketById } from "../store/services/basket/reducers/basket.slice";
import { createOrder } from "../store/services/order/reducers/order.slice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { useBasket } from "./useBasket";

export const useOrder = () => {
    const router = useRouter();
    const {getBasketId} = useBasket();
    const dispatch = useDispatch();
    const {setAwareChangesInBasket, openModalProductNotInStock, setBackRedirectToOrder} = useActions();
    const {isAuth} = useAppSelector(state => state.userReducer);
    const {awareChangesInBasket} = useAppSelector(state => state.orderReducer);

    const create = async () => {
        if(isAuth) {
            const basketHash = getBasketId();
            const basketResult = await dispatch(getBasketById(basketHash));
            const basket = unwrapResult(basketResult);
            
            const productNotInStock = basket.products.some((product: any) => {
                if(!product.inStock) {
                    return product;
                }
            });

            if(productNotInStock && !awareChangesInBasket) {
                setAwareChangesInBasket({aware: true});
                openModalProductNotInStock();
                return false;
            }

            await setAwareChangesInBasket({aware: false});
            dispatch(createOrder(basketHash));
        } else {
            setBackRedirectToOrder({isRedirect: true});
            router.replace('/account/profile');
        }
    }

    return {create};
}