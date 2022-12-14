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
        backgroundColor: "#B05326",
        fontWeight: "bold"
    },
}));

interface ICartBadgeProps {
    quantity: number;
}

const CartBadge: FC<ICartBadgeProps> = ({ quantity }) => {
    return (
        // <Link to="/basket">
            <IconButton aria-label="cart">
                <StyledBadge
                    badgeContent={quantity}
                    color="secondary"
                    style={{
                        height: "30px",
                        width: "30px"
                    }}
                >
                    <ShoppingCartIcon
                        style={{ height: "30px", width: "30px" }}
                    />
                </StyledBadge>
            </IconButton>
        // </Link>
    );
};

export default CartBadge;
