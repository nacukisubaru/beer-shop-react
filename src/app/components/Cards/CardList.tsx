import { Box } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { ICard } from "../../types/card.types";
import CardSmall from "./CardSmall";
import "./css/cards.css";
import "../../../index.css";
interface CardListProps {
    cardsList: ICard[];
    fetch: (page: number) => void;
    page: number;
}

const CardList: FC<CardListProps> = ({ cardsList, fetch, page }) => {
    const [isVisible, setIsVisible] = useState(false);

    const targetRef: any = useRef();
    const callbackFunction = (entries: any) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction);

        const setNewObserver = () => {
            const currentTarget = targetRef.current;
            if (currentTarget) {
                observer.observe(currentTarget);
            }
        };

        if (isVisible) {
            fetch(page);
            setNewObserver();
        }

        setNewObserver();
    }, [targetRef, isVisible]);

    return (
        <>
            <Box className="list-body">
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
            </Box>
        </>
    );
};

export default CardList;
