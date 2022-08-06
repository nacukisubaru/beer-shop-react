import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFilter } from "../../hooks/useFilter";
import { getMinAndMaxPrice } from "../../store/reducers/filter.products";
import { limitPage } from "../../store/services/api.config";
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
    const { addItem, plusQuantity, dropBeerList, resetFilters, resetBeerPage, getBeer, openBeer } = useActions();
    const basket = useAppSelector((state) => state.basketReducer.list);
    const beerList = useAppSelector((state) => state.beerReducer.beerList);

    const dispath = useDispatch();
    const {fetchBeers} = useFilter();

    useEffect(() => {
        const beerList = async () => {
            await resetBeerPage();
            await dropBeerList();
            await resetFilters();
            await dispath(getBeerList({params:{page: 0, limitPage}}));
        }

        beerList();
        dispath(getMinAndMaxPrice());
    }, []);

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
                            plusQuantity({ id: index, value: 1 });
                        }
                    },
                };
            }
        );
    };

    const showBeer = (id: number) => {
        getBeer({id});
        openBeer();
    }

    return (
        <>
            {beerList.length > 0 && (
                <>
                    <CardList
                        cardsList={productsMap(beerList)}
                        fetch={fetchBeers}
                        page={page}
                        scrollList={status == 'resolved' ? true : false}
                        show={showBeer}
                    ></CardList>
                </>
            )}
        </>
    );
};

export default BeersList;
