import { Button } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
//import { beerApi } from "../../store/services/beers/beer.api";
import { getBeerList } from "../../store/services/beers/reducers/beer.slice";
import {
    IProductItem,
    IProductСharacteristics,
} from "../../types/product.types";
import CardList from "../Cards/CardList";

interface BeersListProps {}

const BeersList: FC<BeersListProps> = () => {
    const { page, status, total } = useAppSelector(
        (state) => state.beerReducer
    );
    const { addItem, updateQuantity } = useActions();
    const basket = useAppSelector((state) => state.basketReducer.list);
    const beerList = useAppSelector((state) => state.beerReducer.beerList);

    const dispath = useDispatch();

    useEffect(() => {
        dispath(getBeerList(page));
    }, []);

    const fetchBeers = async (page: any) => {
        dispath(getBeerList(page));
    };

    const productsMap = (data: any) => {
        return data.map(
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
                        const existInBasket = basket.some(
                            (item) => item.id === product.id
                        );
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
                        if (!existInBasket) {
                            addItem(basketItem);
                        } else {
                            const index = basket.findIndex(
                                (item) => item.id === product.id
                            );
                            updateQuantity({ id: index, value: 1 });
                        }
                    },
                };
            }
        );
    };

    return (
        <>
            {beerList.length > 0 && (
                <>
                    <CardList
                        cardsList={productsMap(beerList)}
                        fetch={fetchBeers}
                        page={page}
                    ></CardList>
                </>
            )}
        </>
    );
};

export default BeersList;
