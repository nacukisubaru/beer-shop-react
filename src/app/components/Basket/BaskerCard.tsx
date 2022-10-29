import React, { FC } from "react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IProductBasket } from "../../types/product.types";
import { useActions } from "../../hooks/useActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from '@mui/icons-material/Delete';
import { useBasket } from "../../hooks/useBasket";

interface IBasketCard extends IProductBasket {
    index: number;
}

const BasketCard: FC<IBasketCard> = ({id, index, title, price, quantity, image, description, inStock}) => {
    const {plusQuantity, minusQuantity, removeItem} = useActions();
    const {remove, update} = useBasket();

    const handlerPlusQuan = async () =>{
        await plusQuantity({id, value:1});
        update(id, quantity + 1);
    }

    const handlerMinusQuan = async () => {
        await minusQuantity({id, value:1});
        update(id, quantity -1);
    }

    const handleRemove = () => {
        remove(id);
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
                                variant="h4"
                                style={{
                                    fontSize: "17px",
                                    marginBottom: "10px",
                                    fontWeight: 'bold'
                                }}
                            >
                                {title}
                            </Typography>
                            <div className="description">
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "15px",
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
