import { Box, Button, Card, Typography } from "@mui/material";
import React, { FC } from "react";
import { ICard } from "../../types/card.types";
import "./css/cards.css";

interface ICardSmall extends ICard {
    show: (id: number) => void
}

const CardSmall: FC<ICardSmall> = ({ id, title, description, price, img, buy, show }) => {
    return (
        <>
            <Card
                sx={{
                    width: 300,
                    height: 380,
                    margin: "10px",
                    borderRadius: "15px",
                    paddingTop: "36px"
                }}
            >
                <Box
                    className="card-img"
                    style={{ backgroundSize: "contain" }}
                    sx={{ background: `url(${img}) center center no-repeat` }}
                ></Box>
                <Typography
                    variant="body2"
                    style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                    {description}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "25px" }}>
                    {price}
                </Typography>
                <Button
                    className="card__button"
                    variant="contained"
                    style={{ 
                        width: "279px", 
                        background: "#896043",
                        marginBottom: '5px',
                        height: '30px'
                    }}
                    onClick={buy}
                >
                    Купить
                </Button>
                <Button
                    className="card__button"
                    variant="contained"
                    style={{ 
                        width: "279px", 
                        background: "#896043",
                        height: '30px'
                    }}
                    onClick={()=>{show(id)}}
                >
                    Детально
                </Button>
            </Card>
        </>
    );
};

export default CardSmall;
