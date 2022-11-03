import {
    FormControl,
    InputLabel,
    Select,
    Typography,
} from "@mui/material";
import { FC } from "react";
import Sort from "./Sort";
import "../SortPanel/style.css";
import SortMobile from "./SortMobile";
interface ISortPanel {
    fetchData: (sort: string[]) => void;
}

const SortPanel: FC<ISortPanel> = ({ fetchData }) => {
    return (
        <>
            <div className="sort-panel-wrapper sort-desktop">
                <Typography
                    variant="body1"
                    color="text.secondary"
                    style={{ marginRight: "18px" }}
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
            <div className="sort-panel-wrapper sort-mobile">
                <FormControl sx={{width: '80%'}}>
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
