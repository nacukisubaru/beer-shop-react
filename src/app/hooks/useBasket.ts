import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { basketApi } from "../store/services/basket/basket.api";
import { getBasketByUserId, getBasketById, createBasketByUser } from "../store/services/basket/reducers/basket.slice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IUseBasket {
    add: (quantity: number, productId: number) => Promise<void>,
    remove: (productId: number) => Promise<void>,
    update: (productId: number, quantity: number) => Promise<void>,
    getBasket: () => Promise<void>,
    getBasketByUser: () => Promise<void>
    getBasketId: () => void
}

export const useBasket = ():IUseBasket => {
    const [createBaket] = basketApi.useCreateBaketMutation();
    const [removeProduct] = basketApi.useRemoveProductMutation();
    const [updateProduct] = basketApi.useUpdateProductMutation();
    const dispatch = useDispatch();
    const {setBasket} = useActions();
    const basketId = useAppSelector(state => state.basketReducer.currentBasket);
    const {isAuth} = useAppSelector(state => state.userReducer);

    const add = async (quantity: number, productId: number) => {
        const prodObj:any = {
            quantity, 
            productId
        };

        if(basketId) {
            prodObj.hash = basketId;
        }

        let result:any  = {};
        
        if(isAuth) {
            result = await dispatch(createBasketByUser(prodObj));
            result = unwrapResult(result);
        } else {
            result = await createBaket(prodObj).unwrap();
        }
       
        if(result.hash && !basketId) {
            setBasket(result.hash);
        }

        return result.id;
    }

    const update = async (productId: number, quantity: number) => {
        updateProduct({hash: basketId, productId, quantity});
    }

    const remove = async (productId: number) => {
        await removeProduct({hash: basketId, productId});
    }

    const getBasket = async () => {
        const basketId = getBasketId();
        if(basketId) {
            dispatch(getBasketById(basketId));
        }
    }

    const getBasketByUser = async () => {
        const basketId = getBasketId();
        //if(basketId) {
            dispatch(getBasketByUserId(basketId));
        //}
    }

    const getBasketId = () => {
        return localStorage.getItem("basketId");
    }

    return {add, getBasket, update, remove, getBasketId, getBasketByUser};
}