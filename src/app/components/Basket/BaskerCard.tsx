import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IProductСharacteristics } from "../../types/product.types";

const BasketCard: FC<IProductСharacteristics> = ({id, title, price, quantity, img, characteristics}) => {
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
                                {title}
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
                                <div>{quantity}</div>
                                <AddCircleOutlineIcon />
                            </div>
                        </div>
                        <div className="basket-element basket-price">{price} р</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketCard;
