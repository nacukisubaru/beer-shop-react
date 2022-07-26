import { Grid } from "@mui/material";
import React, { FC } from "react";
import { ICard } from "../../types/card.types";
import CardSmall from "./CardSmall";
import "./css/cards.css";

interface CardListProps {
    cardsList: ICard[];
}

const CardList: FC<CardListProps> = ({ cardsList }) => {
    return (
        <>
            <div className="card-list">
                {cardsList.map((item) => (
                    <CardSmall
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        img={item.img}
                    ></CardSmall>
                ))}
            </div>
        </>
    );
};

export default CardList;
