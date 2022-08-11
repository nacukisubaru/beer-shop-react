import { IBeer } from "../store/services/beers/types/beer.type";
import { IProductСharacteristics } from "../types/product.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { useBasket } from "./useBasket";

export const useProductMap = (list: IBeer[], createProductForBuy:any) => {
    const basketList = useAppSelector((state) => state.basketReducer.list);
    const { addItem, plusQuantity, plusCountPosition } = useActions();
    const {add} = useBasket();  

    return list.map(
        (item) => {
           const product: IProductСharacteristics = createProductForBuy(item);
          
           const buy = () => { 
                const existInBasket = basketList.some(
                    (item) => item.id === product.id
                );
            
                if (!existInBasket) {
                    addItem(product);
                    plusCountPosition();
                } else {
                    plusQuantity({ id: item.id, value: 1 });
                }

                add(1, item.id);
            }

            return {
                ...product,
                buy
            };
        }
    );
};