import { Button, Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import "./css/basket.css";
import img from "../../../assets/images/gus.jpg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface BasketViewProps {}

const BasketView: FC<BasketViewProps> = () => {
    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <div className="basket-container">
                        <div className="basket-element">
                            <Box
                                className="card-img"
                                style={{
                                    backgroundSize: "contain",
                                    height: "150px",
                                }}
                                sx={{
                                    background: `url(${img}) center center no-repeat`,
                                }}
                            ></Box>
                        </div>
                        <div className="basket-element product-info-wrapper">
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "15px",
                                    marginBottom: "10px",
                                }}
                            >
                                Жопецкий гусь
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "12px",
                                    marginBottom: "10px",
                                }}
                            >
                                Лучшее пиво в мире
                            </Typography>
                        </div>
                        <div
                            style={{ paddingTop: "45px" }}
                            className="basket-element"
                        >
                            <div className="basket-quantity">
                                <RemoveCircleOutlineIcon />
                                <div>1</div>
                                <AddCircleOutlineIcon />
                            </div>
                        </div>
                        <div className="basket-element basket-price">
                            500 р
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketView;
