import React, { useEffect } from "react";
import BeersList from "../../app/components/Beers/BeersList";
import "../../index.css";
import Menu from "../../app/components/Drawer/Menu/Menu";

export default function Beers() {
    
    return (
        <div className="page-container">
            <Menu />
            <BeersList />
        </div>
    );
} 