import React from "react";
import BasketContainer from "../../app/components/Basket/BasketContainer";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import "../../index.css";

export default function Basket() {
    return (
        <>
            <div className="page-container">
                <Header />
                <Menu callbackApplyFilter={()=>{}} callbackResetFilter={()=>{}}/>
                <BasketContainer />
            </div>
        </>
    );
}