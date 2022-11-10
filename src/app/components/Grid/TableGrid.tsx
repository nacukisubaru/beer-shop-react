import { Button } from "@mui/material";
import {
    DataGrid,
    getGridStringOperators,
    GridSortItem,
    GridToolbar,
} from "@mui/x-data-grid";
import { FC, useState } from "react";
import { useActions } from "../../hooks/useActions";
import PaginationGrid from "./PaginationGrid";
import ToolBarGrid from "./ToolBarGrid";

interface ITableGridProps {
    columns: any[];
    rows: any;
    pageSize: number;
}

const TableGrid: FC<ITableGridProps> = ({ columns, rows, pageSize }) => {
    const { setContentSort, setContentDefaultSort } = useActions();
    const [sortModel, setSortModel] = useState<GridSortItem[]>([
        { field: "id", sort: "desc" },
    ]);
    const filterOperators = getGridStringOperators().filter(({ value }) =>
        ["contains", "equals" /* add more over time */].includes(value)
    );

    const handleSortChange = (sortArray: any) => {
        if (sortArray.length) {
            const field = sortArray[0].field;
            const sort = sortArray[0].sort;
            setSortModel([{ field, sort }]);
            setContentSort({ field, sort: sort.toUpperCase() });
        } else {
            setContentDefaultSort();
            setSortModel([]);
        }
    };

    return (
        <div style={{ height: 860, width: "100%", marginBottom: "10px" }}>
            {/* <div>
                <Button sx={{ width: 259 }}  variant="contained">
                    Добавить
                </Button>
            </div> */}
            <DataGrid
                rows={rows}
                columns={columns.map((item) => {
                    return { ...item, filterOperators };
                })}
                pageSize={pageSize}
                rowsPerPageOptions={[]}
                onSortModelChange={handleSortChange}
                checkboxSelection
                style={{ marginBottom: "40px" }}
                sortModel={sortModel}
                components={{ Footer: PaginationGrid, Toolbar: ToolBarGrid }}
                onFilterModelChange={() => {
                    console.log("we cand send request here!");
                }}
                localeText={{
                    filterOperatorEquals: "Равняется",
                    filterOperatorContains: "Содержит в себе",
                    toolbarColumns: "Колонки",
                    toolbarFilters: "Фильтры",
                    toolbarDensity: "Высота строки",
                }}
            />
        </div>
    );
};

export default TableGrid;
