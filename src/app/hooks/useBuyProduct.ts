import { IProductСharacteristics } from "../types/product.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useBuyProduct = (product: IProductСharacteristics) => {
    const { addItem, setQuantity, plusCountPosition } = useActions();
    const {list} = useAppSelector((state) => state.basketReducer);
    const buy = async (quantity:number) => {
        const existInBasket = list.some(
            (item) => item.id === product.id
        );
     
        if (!existInBasket) {
            await addItem(product);
            plusCountPosition();
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