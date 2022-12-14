import {
    FormControl,
    InputLabel,
    Select,
    Typography,
} from "@mui/material";
import { FC } from "react";
import Sort from "./Sort";
import styles from "../SortPanel/styles/sortPanel.module.css";
import SortMobile from "./SortMobile";
import { makeStyles } from "@mui/styles";
interface ISortPanel {
    fetchData: (sortField: string, order: string) => void;
}

const useStyles = makeStyles({
    typography: {
        marginRight: "18px"
    },
    formControl: {
        width: "80%"
    }
})

//TODO рефакторинг нужно передавать массив объектов перебирать и генерировать компонент
const SortPanel: FC<ISortPanel> = ({ fetchData }) => {
    const classes = useStyles();
    return (
        <>
            <div className={styles.sortPanelWrapper + " " + styles.sortDesktop}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    className={classes.typography}
                >
                    Сортировать по:
                </Typography>
                <Sort
                    name="Названию"
                    fieldOrder="title"
                    action={fetchData}
                    orderValue=""
                />
                <Sort
                    name="Популярности"
                    fieldOrder="show"
                    action={fetchData}
                    orderValue="DESC"
                />
                <Sort
                    name="Новинкам"
                    fieldOrder="createdAt"
                    action={fetchData}
                    orderValue=""
                />
                <Sort
                    name="Цене"
                    fieldOrder="price"
                    action={fetchData}
                    orderValue=""
                />
            </div>
            <div className={styles.sortPanelWrapper + " " + styles.sortMobile}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Сортировка</InputLabel>
                    <Select>
                        <SortMobile
                            name="По названию А-Я"
                            fieldOrder="title"
                            orderBy="ASC"
                            sort={fetchData}
                        />
                        <SortMobile
                            name="По названию Я-А"
                            fieldOrder="title"
                            orderBy="DESC"
                            sort={fetchData}
                        />
                        <SortMobile
                            name="По популярности"
                            fieldOrder="show"
                            orderBy="DESC"
                            sort={fetchData}
                        />
                        <SortMobile
                            name="По дате(старее)"
                            fieldOrder="createdAt"
                            orderBy="ASC"
                            sort={fetchData}
                        />
                        <SortMobile
                            name="По дате(новее)"
                            fieldOrder="createdAt"
                            orderBy="DESC"
                            sort={fetchData}
                        />
                        <SortMobile
                            name="По цене min"
                            fieldOrder="price"
                            orderBy="ASC"
                            sort={fetchData}
                        />
                        <SortMobile
                            name="По цене max"
                            fieldOrder="price"
                            orderBy="DESC"
                            sort={fetchData}
                        />
                    </Select>
                </FormControl>
            </div>
        </>
    );
};

export default SortPanel;
