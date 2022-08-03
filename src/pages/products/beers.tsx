import React, { useEffect } from "react";
import BeersList from "../../app/components/Beers/BeersList";
import "../../index.css";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import { useFilter } from "../../app/hooks/useFilter";
import { Button } from "@mui/material";

export default function Beers() {
    const {fetchBeersByFilter} = useFilter();
    return (
        
        <div className="page-container">
            <Header />
            <Menu callbackApplyFilter={fetchBeersByFilter}/>
            <BeersList />
        </div>
    );
} 