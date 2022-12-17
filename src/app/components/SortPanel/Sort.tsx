import { Typography } from "@mui/material";
import { FC, useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
//import "../SortPanel/style.css";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./styles/sort.module.css";
import { makeStyles } from "@mui/styles";

interface ISort {
    name: string;
    fieldOrder: string;
    action: (sortField: string, order: string) => void;
    orderValue: string
}

const useStyles = makeStyles({
    icon: {
        fontSize: "13px"
    },
})

const Sort: FC<ISort> = ({ name, fieldOrder, orderValue = '', action }) => {
    const {sortField} = useAppSelector(state => state.filterProductsReducer);
    const [order, setOrder] = useState("ASC");
    const {setSort} = useActions();
    const classes = useStyles();

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
            className={fieldOrder === sortField ? styles.sortActive : styles.sortDeactive}
        >
            {name}
            {order === "ASC" && !orderValue && <NorthIcon className={classes.icon} />}
            {order === "DESC" && !orderValue && <SouthIcon className={classes.icon} />}
        </Typography>
    );
};

export default Sort;
