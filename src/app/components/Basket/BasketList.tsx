import React, { FC, useEffect } from "react";
//import "./css/basket.css";
import BasketCard from "./BaskerCard";
import { IProductBasket } from "../../types/product.types";
import TotalCard from "./TotalCard";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductNotInStock from "../Modals/Messages/ProductNotInStock";
import SuccessOrder from "../Modals/Messages/SuccessOrder";
import { useBasket } from "../../hooks/useBasket";

interface BasketListProps {
    basketList: IProductBasket[];
    count: number,
    order:() => void 
}

const BasketList: FC<BasketListProps> = ({basketList, order, count}) => {
    
    const initialValue = 0;
    const total:any =  basketList.length > 0 ? basketList.reduce((accumulator, currentValue: any) => {
        return accumulator + currentValue.price * currentValue.quantity;
    }, initialValue): 0;
    
    const {getBasket} = useBasket();

    useEffect(() => {
        getBasket();
    }, []);

    return (
        <>
            <div className="wrapper-basket-list">
                <div className="container-basket-list">
                    {basketList.map((item: IProductBasket, index: number) => (
                        <BasketCard
                            key={index}
                            id={item.id}
                            index={index}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            inStock={item.inStock}
                            //characteristics={item.characteristics}
                            image={item.image} 
                            description={item.description} />
                    ))}
                </div>
                {basketList.length > 0 ? (
                    <div className="basket-total-card">
                        <TotalCard totalPrice={total} order={order}/>
                    </div>   
                ): (
                    <div>
                        <div className="empty-basket">Ваша корзина пуста</div>
                        <div>
                            <Link to={'/products/beers'} style={{textDecoration: 'none'}}>
                                <Button variant="contained">Посмотреть каталог</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <ProductNotInStock />
            <SuccessOrder />
        </>
    );
};

export default BasketList;
