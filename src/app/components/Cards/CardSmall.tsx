import { Box, Button, Card, Typography } from "@mui/material";
import React, { FC } from "react";
import img from "../../../assets/images/gus.jpg";
import { ICard } from "../../types/card.types";
import "./css/cards.css";

const CardSmall: FC<ICard> = ({title, description, price, img}) => {
    console.log(img);
    return (
        <>
            <Card sx={{ width: 300, height: 380, margin: "10px" }}>
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
                <Typography variant="body2" style={{ marginBottom: "10px"}}>{description}</Typography>
                <Typography variant="body2" style={{ marginBottom: "10px"}}>{price}</Typography>
                <Button
                    variant="contained"
                    style={{ width: "279px"}}
                >
                    Купить
                </Button>
            </Card>
        </>
    );
};

export default CardSmall;
