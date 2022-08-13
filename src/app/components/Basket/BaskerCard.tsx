import React, { FC } from "react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IProductBasket } from "../../types/product.types";
import { useActions } from "../../hooks/useActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from '@mui/icons-material/Delete';

interface IBasketCard extends IProductBasket {
    index: number;
}

const BasketCard: FC<IBasketCard> = ({id, index, title, price, quantity, image, description}) => {
    const {plusQuantity, minusQuantity, removeItem} = useActions();

    const handlerPlusQuan = () =>{
        return plusQuantity({id, value:1});
    }

    const handlerMinusQuan = () => {
        return minusQuantity({id, value:1});
    }

    const handleRemove = () => {
        return removeItem({id});
    }

    return (
        <>
            <div className="container" key={index}>
                <div className="wrapper">
                    
                    <div className="basket-container">
                        <div className="basket-element">
                            <Box
                                style={{
                                    backgroundSize: "contain",
                                    height: "150px",
                                }}
                                sx={{
                                    background: `url(${image}) center center no-repeat`,
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
                            <div className="description">
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "12px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {description}
                                </Typography>
                            </div>
                        </div>
                        <div
                            style={{ paddingTop: "45px" }}
                            className="basket-element"
                        >
                            <div className="basket-quantity">
                                <RemoveCircleOutlineIcon onClick={handlerMinusQuan} />
                                    <div>{quantity}</div>
                                <AddCircleOutlineIcon onClick={handlerPlusQuan} />
                            </div>
                        </div>
                        <div className="basket-element basket-price">
                            {price * quantity} р
                            <div>
                                <IconButton onClick={handleRemove}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketCard;
