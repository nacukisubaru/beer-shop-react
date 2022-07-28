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
    const [isFetching, setFetching] = useState(false);

    const ref = useRef();
    
    useEffect(()=> {
        fetch(page);
    }, []);

    useEffect(() => {
        const fetching = async () => {
            if(isFetching) {
                await fetch(page);
                setTimeout(()=>{
                    setFetching(false);
                }, 2000);
            }
        }
        fetching();
    },[isFetching]);

    useEffect(() => {
        const scroll:any = ref.current;
        scroll.addEventListener('scroll', scrollHandler);
        scroll.addEventListener('scroll', scrollHandler);
        return function() {
            scroll.removeEventListener('scroll', scrollHandler);
        }    
    }, []);

    const scrollHandler = (e: any) => {
        const scrollPosition = e.target.scrollHeight - e.target.scrollTop + window.innerHeight;
        if(scrollPosition <= 1760) {
            if(!isFetching) {
                if(scrollPosition > 1500) {
                    e.target.scrollTop = e.target.scrollTop - 1;
                }
                setFetching(true);
            }
        }
    }

    return (
        <>
            <Box className="list-body" ref={ref}>
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
                </div>
            </Box>
        </>
    );
};

export default CardList;
