import React, { useEffect } from "react";
import { useFilter } from "../../app/hooks/useFilter";
import { useActions } from "../../app/hooks/useActions";
import { useDispatch } from "react-redux";
import { getBeerList } from "../../app/store/services/beers/reducers/beer.slice";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import BeersList from "../../app/components/Beers/BeersList";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import BeerModal from "../../app/components/Modals/Products/BeerModal";
import "../../index.css";
import { limitPage } from "../../app/http/http.request.config";

export default function Beers() {
    const { fetchBeersByFilter } = useFilter();
    const { resetFilters, dropBeerList, closeFilterMenu } = useActions();
    const { beer, beerList } = useAppSelector(
        (state) => state.beerReducer
    );

    const dispath = useDispatch();

    const handleApplyFilter = () => {
        fetchBeersByFilter();
        closeFilterMenu();
    };

    const handleResetFilter = async () => {
        closeFilterMenu();
        await resetFilters();
        await dropBeerList();
        await dispath(getBeerList({ params: { page: 0, limitPage } }));
    };

    return (
        <div className="page-container">
            <Header />
            <Menu
                callbackApplyFilter={handleApplyFilter}
                callbackResetFilter={handleResetFilter}
            />
            <BeersList />
            <ResultNotFoundByFilter />
            {beerList.length > 0 && !isEmptyObject(beer) && (
                 <BeerModal />
            )}
        </div>
    );
}
