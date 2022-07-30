import { FC } from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

interface ICartBadge {
    quantity: number
}

const CartBadge:FC<ICartBadge> = ({quantity}) => {
    return (
        <Link to="/basket">
        <IconButton aria-label="cart">
                <StyledBadge badgeContent={quantity} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </Link>
    );
}

export default CartBadge;
