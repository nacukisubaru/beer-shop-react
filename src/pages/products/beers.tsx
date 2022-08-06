import React, { useEffect } from "react";
import BeersList from "../../app/components/Beers/BeersList";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import { useFilter } from "../../app/hooks/useFilter";
import { useActions } from "../../app/hooks/useActions";
import { limitPage } from "../../app/store/services/api.config";
import { useDispatch } from "react-redux";
import { getBeerList } from "../../app/store/services/beers/reducers/beer.slice";
import "../../index.css";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import BeerModal from "../../app/components/Modals/Products/BeerModal";

export default function Beers() {
    const { fetchBeersByFilter } = useFilter();
    const { resetFilters, dropBeerList, closeFilterMenu } = useActions();
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
            <BeerModal />
        </div>
    );
}
