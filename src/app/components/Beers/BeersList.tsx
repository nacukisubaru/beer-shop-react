import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { beerApi } from "../../store/services/beers/beer.api";
import {
    IProductItem,
    IProductСharacteristics,
} from "../../types/product.types";
import CardList from "../Cards/CardList";

interface BeersListProps {}

const BeersList: FC<BeersListProps> = () => {
    const { data, isLoading } = beerApi.useFetchAllBeersQuery(0);
    const { addItem, updateQuantity } = useActions();
    const basket = useAppSelector(state => state.basketReducer);

    const productsMap = (data: any) => {
        return data.rows.map(
            (item: {
                compound: string;
                fortress: number;
                ibu: number;
                volume: number;
                product: IProductItem;
            }) => {
                const product = {
                    id: item.product.id,
                    title: item.product.title,
                    description: item.product.description,
                    price: item.product.price,
                    img: item.product.image,
                };

                return {
                    ...product,
                    buy: () => {
                        const existInBasket = basket.some(item => item.id === product.id);
                        const basketItem: IProductСharacteristics = {
                            ...product,
                            quantity: 1,
                            characteristics: {
                                compound: item.compound,
                                fortress: item.fortress,
                                ibu: item.ibu,
                                volume: item.volume,
                            },
                        };
                        if(!existInBasket) {
                            addItem(basketItem);
                        } else {
                            const index = basket.findIndex(item => item.id === product.id);
                            updateQuantity({id: index, value: 1});
                        }
                        console.log(item);
                    },
                };
            }
        );
    };

    return (
        <>{!isLoading && <CardList cardsList={productsMap(data)}></CardList>} 
            <Link to="/basket">В корзину</Link>
        </>
    );
};

export default BeersList;
