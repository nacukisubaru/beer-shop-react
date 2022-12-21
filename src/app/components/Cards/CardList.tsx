import React, { FC } from "react";
import { Box } from "@mui/material";
import { ICard } from "../../types/card.types";
import { useObserverScroll } from "../../hooks/useObserverScroll";
import { IAction } from "../../types/action.deal.types";
import { useActions } from "../../hooks/useActions";
import CardSmall from "./CardSmall";
import BasicSpeedDial from "../SpeedDial/BasicSpeedDial";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import styles from "./styles/cards.module.css";
import { makeStyles } from "@mui/styles";

interface CardListProps {
    cardsList: ICard[],
    page: number,
    scrollList: boolean,
    fetch: (page: number, sortField: string, order: string) => void,
    show: (id: number) => void
}

const useStyles = makeStyles({
    bottom: {
        marginBottom: "200px"
    }
});

const CardList: FC<CardListProps> = ({ cardsList, fetch, page, scrollList = true, show }) => {
    const targetRef: any = useObserverScroll(fetch, page, scrollList);
    const {switchFilterMenu, switchMainMenu} = useActions();
    const classes = useStyles();
    const actions: IAction[] = [
        { icon: <MenuIcon />, name: "Меню", click: switchMainMenu },
        { icon: <FilterAltIcon />, name: "Фильтр",click: switchFilterMenu },
    ];

    return (
        <>
            <Box className={classes.bottom}>
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
                                show={show} />
                        ))}
                       
                    </div>
                    <div id="reff" ref={targetRef}></div>
                    <div className={styles.filterWrapperBtn}>
                        <BasicSpeedDial actions={actions}></BasicSpeedDial>
                    </div>
                </div>
            </Box>
           
        </>
    );
};

export default CardList;
