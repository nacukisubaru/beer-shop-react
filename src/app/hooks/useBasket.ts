import { basketApi } from "../store/services/basket/basket.api";

interface IUseBasket {
    add: (quantity: number, productId: number) => Promise<void>
}

export const useBasket = ():IUseBasket => {
    const [createBaket] = basketApi.useCreateBaketMutation();

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

    return {add};
}