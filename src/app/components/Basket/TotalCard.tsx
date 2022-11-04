import React, { FC } from "react";
import { Button, Card, Typography } from "@mui/material";
interface ITotalCard {
    totalPrice: number;
    order: () => void;
}

const TotalCard: FC<ITotalCard> = ({ totalPrice, order }) => {
    return (
        <>
            <Card
                sx={{
                    width: 350,
                    marginTop: "49px",
                    height: "235px",
                    position: "fixed",
                    borderRadius: "32px",
                }}
            >
                <div className="total-card">
                    <Typography variant="h5">Итого</Typography>
                    <Typography variant="h5">{totalPrice} р</Typography>
                </div>
                <div className="total-card-details">
                    <Typography variant="h6" style={{display: "flex"}}>Доставка:</Typography>
                    <Typography variant="body2" style={{display: "flex", marginLeft: '-14px'}}>Ежедневно с 12:00 до 22:00 г Калуга, Улица Братьев Луканиных 7</Typography>
                </div>
                <Button sx={{ width: 250 }} onClick={order} variant="contained">
                    Заказать
                </Button>
            </Card>
        </>
    );
};

export default TotalCard;
