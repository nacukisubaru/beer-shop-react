import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useBeerMap } from "../../hooks/useBeerMap";
import { useFilter } from "../../hooks/useFilter";
import { getMinAndMaxPrice } from "../../store/reducers/filter.products";
import { limitPage } from "../../store/services/api.config";
import { getBeerList } from "../../store/services/beers/reducers/beer.slice";
import CardList from "../Cards/CardList";

interface BeersListProps {}

const BeersList: FC<BeersListProps> = () => {
    const { page, status, total } = useAppSelector(
        (state) => state.beerReducer
    );
    const { dropBeerList, resetFilters, resetBeerPage, getBeer, openBeer } = useActions();
    const {beerList} = useAppSelector((state) => state.beerReducer);
    const beers = useBeerMap(beerList);

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
