import { createProductForBuy } from "../store/services/basket/reducers/basket.slice";
import { IBeer } from "../store/services/beers/types/beer.type";
import { IProduct, IProductBasket } from "../types/product.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { useBasket } from "./useBasket";

export const useProductMap = (list: IBeer[]) => {
    const basketList = useAppSelector((state) => state.basketReducer.list);
    const { addItem, plusQuantity, plusCountPosition } = useActions();
    const {add} = useBasket();  

    return list.map(
        (item) => {
           const product: IProductBasket = createProductForBuy(item.product);
          
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