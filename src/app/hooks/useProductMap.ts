import { createProductForBuy } from "../store/services/basket/reducers/basket.slice";
import { IBeer } from "../store/services/beers/types/beer.type";
import { IProduct, IProductBasket } from "../types/product.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { useBasket } from "./useBasket";

export const useProductMap = (list: IBeer[]) => {
    const basketList = useAppSelector((state) => state.basketReducer.list);
    const { addItem, plusQuantity, plusCountPosition } = useActions();
    const {add, update} = useBasket();  

    return list.map(
        (item) => {
           const product: IProductBasket = createProductForBuy(item.product);
          
           const buy = () => { 
                const existInBasket = basketList.some(
                    (item) => item.id === product.id
                );
            
                if (!existInBasket) {
                    add(1, item.id);
                    addItem(product);
                    plusCountPosition();
                } else {
                    const productBasket: IProductBasket[] = basketList.filter((item) => {return item.id === product.id});
                    update(item.id, productBasket[0].quantity + 1)
                    plusQuantity({ id: item.id, value: 1 });
                }
            }

            return {
                ...product,
                buy
            };
        }
    );
};