import { IProductСharacteristics } from "../types/product.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useBuyProduct = (product: IProductСharacteristics) => {
    const { addItem, plusQuantity } = useActions();
    const {list} = useAppSelector((state) => state.basketReducer);
    const buy = () => {
        const existInBasket = list.some(
            (item) => item.id === product.id
        );
     
        if (!existInBasket) {
            addItem(product);
        } else {
            const index = list.findIndex(
                (item) => item.id === product.id
            );
            plusQuantity({ id: index, value: 1 });
        }
    }
    
    return [buy];
}