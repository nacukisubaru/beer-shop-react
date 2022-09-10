import { Typography } from "@mui/material";
import { FC, useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import "../SortPanel/style.css";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

interface ISort {
    name: string;
    fieldOrder: string;
    action: (sort: string[]) => void;
    orderValue: string
}

const Sort: FC<ISort> = ({ name, fieldOrder, orderValue = '', action }) => {
    const sortArray = useAppSelector(state => state.filterProductsReducer.sort);
    const [order, setOrder] = useState("ASC");
    const {setSort} = useActions();

    const sort = (order: string) => {
        setOrder(order);
        setSort({field: fieldOrder, value: order});
        action([fieldOrder, order]);
    }

    const changeOrder = () => {
        if (order === "ASC") {
            sort("DESC");
        } else {
            sort("ASC");
        }
    };

    const defaultOrder = () => {
        sort(orderValue);
    }

    return (
        <Typography
            variant="body1"
            style={{ marginRight: "18px" }}
            onClick={orderValue ? defaultOrder : changeOrder}
            className={fieldOrder === sortArray[0] ? "sort-active" : "sort-deactive"}
        >
            {name}
            {order === "ASC" && !orderValue && <NorthIcon style={{ fontSize: "13px" }} />}
            {order === "DESC" && !orderValue && <SouthIcon style={{ fontSize: "13px" }} />}
        </Typography>
    );
};

export default Sort;