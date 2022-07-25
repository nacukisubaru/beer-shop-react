import { Grid } from "@mui/material";
import React, { FC } from "react";
import CardSmall from "./CardSmall";
import './css/cards.css'

interface CardListProps {}

const CardList: FC<CardListProps> = ({}) => {

    return (
        <>
        <div className="card-list">
            
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
            <CardSmall></CardSmall>
          
           
        </div>
             
        </>
    );
};

export default CardList;
