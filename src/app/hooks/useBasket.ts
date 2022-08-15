import { useDispatch } from "react-redux";
import { getValStorage, setValStorage } from "../helpers/storageHelper";
import { basketApi } from "../store/services/basket/basket.api";
import { getBasketByUserId, getBasketList } from "../store/services/basket/reducers/basket.slice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IUseBasket {
    add: (quantity: number, productId: number) => Promise<void>,
    remove: (productId: number) => Promise<void>,
    update: (productId: number, quantity: number) => Promise<void>,
    getBasket: () => Promise<void>,
    getBasketByUser: (userId: number) => Promise<void>
}

export const useBasket = ():IUseBasket => {
    const [createBaket] = basketApi.useCreateBaketMutation();
    const [removeProduct] = basketApi.useRemoveProductMutation();
    const [updateProduct] = basketApi.useUpdateProductMutation();
    const dispatch = useDispatch();
    const {setBasket} = useActions();
    const basketId = useAppSelector(state => state.basketReducer.currentBasket);
    const {user} = useAppSelector(state => state.userReducer);

    const add = async (quantity: number, productId: number) => {
        const prodObj:any = {
            quantity, 
            productId
        };

        if(basketId) {
            prodObj.id = basketId;
        }

        if(user.id) {
            prodObj.userId = user.id;
        }

        const result:any = await createBaket(prodObj).unwrap();
       
        if(result.id && !basketId) {
            setBasket(result.id);
        }

        return result.id;
    }

    const update = async (productId: number, quantity: number) => {
        updateProduct({id: basketId, productId, quantity});
    }

    const remove = async (productId: number) => {
        await removeProduct({id: basketId, productId});
    }

    const getBasket = async () => {
        const basketId = getBasketId();
        if(basketId) {
            dispatch(getBasketList(basketId));
        }
    }

    const getBasketByUser = async (userId: number) => {
        dispatch(getBasketByUserId(userId));
    }

    const getBasketId = () => {
        return Number(localStorage.getItem("basketId"));
    }

    return {add, getBasket, update, remove, getBasketByUser};
}