import { Box, Button, Card, Typography } from "@mui/material";
import React, { FC } from "react";
import img from "../../../assets/images/gus.jpg";
import "./css/cards.css";

interface CardProps {}

const CardSmall: FC<CardProps> = ({}) => {
    return (
        <>
            <Card sx={{ width: 300, height: 350, margin: "10px" }}>
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
                    Жопецкий гусь
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px"}}>Описание гуся</Typography>
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
