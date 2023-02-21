import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IProductBasket } from "../types/product.types";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { useBasket } from "./useBasket";

export const useBuyProduct = (product: IProductBasket) => {
    const { addItem, setQuantity, plusCountPosition } = useActions();
    const {list} = useAppSelector((state) => state.basketReducer);
    const {add, update} = useBasket();
    const router = useRouter();

    const [inBasket, setProductInBasket] = useState(false);
    const [isBuyBtnClick, clickBuyBtn] = useState(false);
    const { closeProduct } = useActions();

    const buy = async (quantity:number) => {
        const existInBasket = list.some(
            (item) => item.id === product.id
        );
     
        if (!existInBasket) {
            await addItem(product);
            add(quantity, product.id);
            plusCountPosition();
            if(quantity) {
               await setQuantity({ id: product.id, value: quantity });
            }
        } else {
            if(quantity) {
                setQuantity({ id: product.id, value: quantity });
                update(product.id, quantity);
            }
        }
    }


    const findItemInBasket = (id: number) => {
        const items = list.filter((item) => {
            if (item.id === id) {
                return item;
            }
            return false;
        });

        if (items.length <= 0) {
            return false;
        }

        return items[0];
    };

    const buyProduct = () => {        
        if (inBasket) {
            router.replace('/basket');
            closeProduct();
        } else {
            clickBuyBtn(true);
            setTimeout(() => {
                clickBuyBtn(false);
            }, 5000);
            setProductInBasket(true);
            buy(1);
        }
    };

    useEffect(() => {
        const productInBasket = findItemInBasket(product.id);
        if (productInBasket) {
            setProductInBasket(true);
        } else {
            setProductInBasket(false);
        }
    }, [list]);
    
    return {buy, buyProduct, isBuyBtnClick, inBasket};
}