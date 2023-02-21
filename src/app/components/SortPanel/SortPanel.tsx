import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import { FC } from "react";
import Sort from "./Sort";
import styles from "../SortPanel/styles/sortPanel.module.css";
import { makeStyles } from "@mui/styles";
import SortMobileSelect from "./SortMobileSelect";

interface ISortItemsList {
    name: string;
    fieldOrder: string;
    orderBy: string;
}
interface ISortPanel {
    sortItemsList: ISortItemsList[];
    sortMobileItemsList: ISortItemsList[];
    fetchData: (sortField: string, order: string) => void;
}

const SortPanel: FC<ISortPanel> = ({ sortItemsList, sortMobileItemsList, fetchData }) => {
    return (
        <>
            <div className={styles.sortPanelWrapper + " " + styles.sortDesktop}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    style={{ marginRight: "18px" }}
                >
                    Сортировать по:
                </Typography>
                {sortItemsList.map((item) => {
                    return <Sort
                        key={item.name}
                        name={item.name}
                        fieldOrder={item.fieldOrder}
                        action={fetchData}
                        orderValue={item.orderBy}
                    />;
                })}
            </div>
            <div className={styles.sortPanelWrapper + " " + styles.sortMobile}>
                <FormControl style={{ width: "80%" }}>
                    <InputLabel>Сортировка</InputLabel>
                    <SortMobileSelect
                        sortItemsList={sortMobileItemsList}
                        sort={fetchData}
                    />
                </FormControl>
            </div>
        </>
    );
};

export default SortPanel;
