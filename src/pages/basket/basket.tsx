import React from "react";
import BasketContainer from "../../app/components/Basket/BasketContainer";
import Header from "../../app/components/Header/Header";
import "../../index.css";

export default function Basket() {
    return (
        <>
            <div className="page-container">
                <Header />
                <BasketContainer />
            </div>
        </>
    );
}