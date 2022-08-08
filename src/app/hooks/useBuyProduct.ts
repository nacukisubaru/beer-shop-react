import { IProductСharacteristics } from "../types/product.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useBuyProduct = (product: IProductСharacteristics) => {
    const { setItem, setQuantity } = useActions();
    const {list} = useAppSelector((state) => state.basketReducer);
    const buy = async (quantity:number) => {
        const existInBasket = list.some(
            (item) => item.id === product.id
        );
     
        if (!existInBasket) {
            await setItem(product);
            if(quantity) {
               await setQuantity({ id: product.id, value: quantity });
            }
        } else {
            if(quantity) {
                setQuantity({ id: product.id, value: quantity });
            }
        }
    }
    
    return [buy];
}