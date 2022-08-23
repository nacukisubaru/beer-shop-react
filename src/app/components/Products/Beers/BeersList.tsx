import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFilter } from "../../../hooks/useFilter";
import { useProductMap } from "../../../hooks/useProductMap";
import { useBeerList } from "../../../hooks/useProducts";
import { limitPage } from "../../../http/http.request.config";
import { getBeerList } from "../../../store/services/beers/reducers/beer.slice";
import CardList from "../../Cards/CardList";

interface BeersListProps {}

const BeersList: FC<BeersListProps> = () => {
    const { page, status } = useAppSelector(
        (state) => state.beerReducer
    );
    const { getBeer, openBeer } = useActions();
    const {beerList} = useAppSelector((state) => state.beerReducer);
    const beers = useProductMap(beerList);

    const {fetchBeers} = useFilter();
    useBeerList();

    const showBeer = (id: number) => {
        getBeer({id});
        openBeer();
    }

    return (
        <>
            {beerList.length > 0 && (
                <>
                    <CardList
                        cardsList={beers}
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
