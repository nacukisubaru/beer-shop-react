import { Typography } from "@mui/material";
import { FC, useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
//import "../SortPanel/style.css";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

interface ISort {
    name: string;
    fieldOrder: string;
    action: (sortField: string, order: string) => void;
    orderValue: string
}

const Sort: FC<ISort> = ({ name, fieldOrder, orderValue = '', action }) => {
    const {sortField} = useAppSelector(state => state.filterProductsReducer);
    const [order, setOrder] = useState("ASC");
    const {setSort} = useActions();

    const sort = async (order: string) => {
        await setOrder(order);
        await setSort({field: fieldOrder, value: order});
        action(fieldOrder, order);
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
            className={fieldOrder === sortField ? "sort-active" : "sort-deactive"}
        >
            {name}
            {order === "ASC" && !orderValue && <NorthIcon style={{ fontSize: "13px" }} />}
            {order === "DESC" && !orderValue && <SouthIcon style={{ fontSize: "13px" }} />}
        </Typography>
    );
};

export default Sort;
