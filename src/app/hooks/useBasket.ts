import { useDispatch } from "react-redux";
import { basketApi } from "../store/services/basket/basket.api";
import { getBasketList } from "../store/services/basket/reducers/basket.slice";

interface IUseBasket {
    add: (quantity: number, productId: number) => Promise<void>,
    getBasket: () => Promise<void>
}

export const useBasket = ():IUseBasket => {
    const [createBaket] = basketApi.useCreateBaketMutation();
    const dispatch = useDispatch();
    
    const add = async (quantity: number, productId: number) => {
        const basketId = localStorage.getItem("basketId");
        let obj:any = {quantity, productId};
        if(basketId && basketId !== undefined) {
            obj.id = basketId;
        }

        const result:any = await createBaket(obj).unwrap();
        
        if(result.id) {
            localStorage.setItem("basketId", result.id);
        }

        return result.id;
    }

    const getBasket = async () => {
        const basketId = localStorage.getItem("basketId");
        if(basketId) {
            dispatch(getBasketList(basketId));
        }
    }

    return {add, getBasket};
}