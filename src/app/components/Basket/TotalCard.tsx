import { Button, Card, Typography } from "@mui/material";
import React, { FC } from "react";

interface ITotalCard {
    totalPrice: number
}

const TotalCard: FC<ITotalCard> = ({totalPrice}) => {

    return (
        <>
            <Card sx={{ width: 350, marginTop: "49px", height: "235px" }}>
                <div className="total-card">
                    <Typography variant="h5">Итого</Typography>
                    <Typography variant="h5">{totalPrice} р</Typography>
                </div>
                <Button sx={{width: 250}} variant="contained">Заказать</Button>
            </Card>
        </>
    );
};

export default TotalCard;
