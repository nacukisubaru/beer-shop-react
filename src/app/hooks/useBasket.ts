import { useDispatch } from "react-redux";
import { basketApi } from "../store/services/basket/basket.api";
import { getBasketList } from "../store/services/basket/reducers/basket.slice";

interface IUseBasket {
    add: (quantity: number, productId: number) => Promise<void>,
    remove: (productId: number) => Promise<void>,
    update: (productId: number, quantity: number) => Promise<void>,
    getBasket: () => Promise<void>
}

export const useBasket = ():IUseBasket => {
    const [createBaket] = basketApi.useCreateBaketMutation();
    const [removeProduct] = basketApi.useRemoveProductMutation();
    const [updateProduct] = basketApi.useUpdateProductMutation();
    const dispatch = useDispatch();
    
    const add = async (quantity: number, productId: number) => {
        const basketId = getBasketId();
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

    const update = async (productId: number, quantity: number) => {
        const basketId = getBasketId();
        updateProduct({id: basketId, productId, quantity});
    }

    const remove = async (productId: number) => {
        const basketId = getBasketId();
        await removeProduct({id: basketId, productId});
    }

    const getBasket = async () => {
        const basketId = getBasketId();
        if(basketId) {
            dispatch(getBasketList(basketId));
        }
    }

    const getBasketId = () => {
        return Number(localStorage.getItem("basketId"));
    }

    return {add, getBasket, update, remove};
}