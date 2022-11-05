import React, { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFilter } from "../../../hooks/useFilter";
import { useProductMap } from "../../../hooks/useProductMap";
import { useBeerList } from "../../../hooks/useProducts";
import { beerApi } from "../../../store/services/beers/beer.api";
import { productApi } from "../../../store/services/products/product.api";
import CardList from "../../Cards/CardList";
import InputSearch from "../../Search/InputSearch";
import SortPanel from "../../SortPanel/SortPanel";

interface BeersListProps {}

const BeersList: FC<BeersListProps> = () => {
    const { page, status } = useAppSelector((state) => state.beerReducer);
    const { getBeer, openBeer } = useActions();
    const { beerList } = useAppSelector((state) => state.beerReducer);
    const {q} = useAppSelector((state) => state.filterProductsReducer);
    const beers = useProductMap(beerList, true);
    const [addShow] = productApi.useAddShowMutation();

    const { fetchBeers, fetchBeersWithSort, fetchBeersBySearch, beersSearchByName, resetListAndFetchBeers, fetchBeersBySearchWithSort } = useFilter();
    useBeerList();

    const showBeer = (id: number) => {
        getBeer({ id });
        openBeer();
        addShow(id);
    };

    return (
        <>
            <InputSearch search={beersSearchByName} reset={resetListAndFetchBeers} />
            <SortPanel fetchData={q ? fetchBeersBySearchWithSort : fetchBeersWithSort} />
            {beerList.length > 0 && (
                <>
                    <CardList
                        cardsList={beers}
                        fetch={q ? fetchBeersBySearch: fetchBeers}
                        page={page}
                        scrollList={status === "resolved" ? true : false}
                        show={showBeer}
                    ></CardList>
                </>
            )}
        </>
    );
};

export default BeersList;
