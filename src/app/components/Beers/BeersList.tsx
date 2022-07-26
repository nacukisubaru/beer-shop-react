import React, { FC } from "react";
import { beerApi } from "../../store/services/beers/beer.api";
import { IBeer } from "../../store/services/beers/types/beer.type";
import { IProductItem } from "../../types/product.types";
import CardList from "../Cards/CardList";
import { host } from '../../store/services/api.config';

interface BeersListProps {}

const BeersList: FC<BeersListProps> = () => {
    const { data, isLoading } = beerApi.useFetchAllBeersQuery(0);

    const productsMap = (data: any) => {
        return data.rows.map(
            (item: {
                product: IProductItem;
            }) => {
                return {
                    title: item.product.title,
                    description: item.product.description,
                    price: item.product.price,
                    img: item.product.image
                };
            }
        );
    };

    return (
        <>
            {!isLoading && (
                <CardList cardsList={productsMap(data)}></CardList>
            )}
            
        </>
    );
};

export default BeersList;
