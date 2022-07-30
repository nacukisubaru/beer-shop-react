import { Box } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { ICard } from "../../types/card.types";
import CardSmall from "./CardSmall";
import "./css/cards.css";
import "../../../index.css";
import { useObserverScroll } from "../../hooks/useObserverScroll";
import BasicSpeedDial from "../SpeedDial/BasicSpeedDial";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IAction } from "../../types/action.deal.types";
import { useActions } from "../../hooks/useActions";

interface CardListProps {
    cardsList: ICard[];
    fetch: (page: number) => void;
    page: number;
}

const CardList: FC<CardListProps> = ({ cardsList, fetch, page }) => {
    const targetRef: any = useObserverScroll(fetch, page);
    const {switchFilterMenu, switchMainMenu} = useActions();

    const actions: IAction[] = [
        { icon: <MenuIcon />, name: "Меню", click: switchMainMenu },
        { icon: <FilterAltIcon />, name: "Фильтр",click: switchFilterMenu },
    ];

    return (
        <>
            <Box className="list-body">
                <div>
                    <div className="card-list">
                        {cardsList.map((item) => (
                            <CardSmall
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                img={item.img}
                                buy={item.buy}
                            ></CardSmall>
                        ))}

                        <div ref={targetRef}></div>
                    </div>
                    <div className="filter-wrapper-btn">
                        <BasicSpeedDial actions={actions}></BasicSpeedDial>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default CardList;
