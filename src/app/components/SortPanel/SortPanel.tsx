import { Typography } from "@mui/material";
import { FC } from "react";
import Sort from "./Sort";
import '../SortPanel/style.css';

interface ISortPanel {
    fetchData: (sort: string[]) => void
} 

const SortPanel:FC<ISortPanel> = ({fetchData}) => {
    return (
        <>
            <div className="sort-panel-wrapper">
                <Typography variant="body1" color='text.secondary' style={{marginRight: '18px'}}>
                    Сортировать по:
                </Typography>
                <Sort
                    name="Названию" 
                    fieldOrder="name"
                    action={fetchData}
                    orderValue=""
                />
                <Sort
                    name="Популярности" 
                    fieldOrder="popular"
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
        </>
    );
}

export default SortPanel;