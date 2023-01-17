import React, { FC } from "react";
import { Box } from "@mui/material";
import { ICard } from "../../types/card.types";
import { useObserverScroll } from "../../hooks/useObserverScroll";
import { IAction } from "../../types/action.deal.types";
import { useActions } from "../../hooks/useActions";
import CardSmall, { ISettingsCard } from "./CardSmall";
import BasicSpeedDial from "../SpeedDial/BasicSpeedDial";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import styles from "./styles/cards.module.css";
import { makeStyles } from "@mui/styles";

interface CardListProps {
    cardsList: ICard[],
    page?: number,
    scrollList?: boolean,
    filterBtn?:boolean,
    settingsCardProps: ISettingsCard,
    childrenComponent?: any,
    fetch?: (page: number, sortField: string, order: string) => void,
    show?: (id: number) => void
}

const CardList: FC<CardListProps> = ({ cardsList, settingsCardProps, filterBtn = false, fetch = ()=>{}, page = 0, scrollList = false, show = ()=>{}, childrenComponent }) => {
    const targetRef: any = useObserverScroll(fetch, page, scrollList);
    const {switchFilterMenu, switchMainMenu} = useActions();
    const actions: IAction[] = [
        { icon: <MenuIcon />, name: "Меню", click: switchMainMenu },
        { icon: <FilterAltIcon />, name: "Фильтр",click: switchFilterMenu },
    ];

    return (
        <>
            <Box>
                <div>
                    <div className={styles.cardList}>
                        {cardsList.map((item) => (
                            <CardSmall
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                inStock={item.inStock}
                                buy={item.buy}
                                settingsCardProps={settingsCardProps}
                                show={show} 
                            />
                        ))}
                        {childrenComponent && (childrenComponent)}
                    </div>
                    <div id="reff" ref={targetRef}></div>
                    {filterBtn && (
                        <div className={styles.filterWrapperBtn}>
                            <BasicSpeedDial actions={actions}></BasicSpeedDial>
                        </div>
                    )}
                </div>
            </Box>
           
        </>
    );
};

export default CardList;
