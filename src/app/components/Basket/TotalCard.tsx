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
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Итого</Typography>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>{totalPrice} р</Typography>
                </div>
                <div className="total-card-details">
                    <Typography variant="body1" style={{display: "flex", fontWeight: 'bold', marginLeft: '3px'}}>Доставка:</Typography>
                    <Typography variant="body2" style={{display: "flex", marginLeft: '-10px', marginBottom: '50px'}}>Ежедневно с 12:00 до 22:00 г Калуга, Улица Братьев Луканиных 7</Typography>
                    <Button sx={{ width: 259 }} onClick={order} variant="contained">
                        Заказать
                    </Button>
                </div>
            </Card>
        </>
    );
};

export default TotalCard;
