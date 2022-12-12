import { Box, Button, Card, Typography } from "@mui/material";
import React, { FC } from "react";
import { ICard } from "../../types/card.types";
import "./styles/cards.module.css";

interface ICardSmall extends ICard {
    show: (id: number) => void
}

const CardSmall: FC<ICardSmall> = ({ id, title, description, price, image, inStock, buy, show }) => {

    const handleShow = () => {
       return show(id);
    }

    return (
        <>
            <Card
                sx={{
                    width: 300,
                    height: 390,
                    margin: "10px",
                    borderRadius: "15px",
                    paddingTop: "36px"
                }}
            >
                <div className={inStock ? 'card-content' : 'card-content card-no-active'}>
                    <Box
                        className="card-img"
                        style={{ backgroundSize: "contain" }}
                        sx={{ background: `url(${image}) center center no-repeat` }}
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
                    
                    <div className="card-content-desc">
                        <Typography variant="body2">
                            {description}
                        </Typography>
                    </div>

                    <div className={inStock ? 'card-content-price' : 'card-content-price card-no-active'}>
                        <Typography variant="body2" style={{fontSize: '20px'}}>
                            {price} &#x20bd;
                        </Typography>
                    </div>
                    
                    {!inStock && (
                        <Typography variant="body2" style={{marginTop: '-20px', color: '#8d8d8d'}}>
                            Нет в наличии
                        </Typography> 
                    )}

                    <Button
                        className="card__button"
                        variant="contained"
                        style={{ 
                            width: "279px",
                            marginBottom: '5px',
                            height: '30px'
                        }}
                        disabled={inStock ? false : true}
                        onClick={buy}
                    >
                        Купить
                    </Button>
                    <Button
                        className="card__button"
                        variant="contained"
                        style={{ 
                            width: "279px", 
                            height: '30px'
                        }}
                        onClick={handleShow}
                    >
                        Детально
                    </Button>
                </div>
            </Card>
        </>
    );
};

export default CardSmall;
