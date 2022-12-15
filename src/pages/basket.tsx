import React from "react";
import BasketContainer from "../app/components/Basket/BasketContainer";
import Menu from "../app/components/Drawer/Menu/Menu";

export default function Basket() {
    return (
        <>
            <div className="page-container">
                <Menu callbackApplyFilter={()=>{}} callbackResetFilter={()=>{}} filter={{minPrice: 0, maxPrice: 0, productType: ''}} filterList={[]}/>
                <BasketContainer />
            </div>
        </>
    );
}