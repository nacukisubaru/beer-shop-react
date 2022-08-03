import React, { useEffect } from "react";
import BeersList from "../../app/components/Beers/BeersList";
import "../../index.css";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import { useFilter } from "../../app/hooks/useFilter";
import { Button } from "@mui/material";
import { useActions } from "../../app/hooks/useActions";
import { limitPage } from "../../app/store/services/api.config";
import { useDispatch } from "react-redux";
import { getBeerList } from "../../app/store/services/beers/reducers/beer.slice";

export default function Beers() {
    const {fetchBeersByFilter} = useFilter();
    const {resetFilters, dropBeerList} = useActions();
    const dispath = useDispatch();

    const handleResetFilter = async () => {
       await resetFilters();
       await dropBeerList();
       await dispath(getBeerList({params:{page:0, limitPage}}));
    }

    return (
        
        <div className="page-container">
            <Header />
            <Menu callbackApplyFilter={fetchBeersByFilter} callbackResetFilter={handleResetFilter}/>
            <BeersList />
        </div>
    );
} 