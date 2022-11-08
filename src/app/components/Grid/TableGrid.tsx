import { Button } from "@mui/material";
import { DataGrid, GridSortItem } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { useActions } from "../../hooks/useActions";
import PaginationGrid from "./PaginationGrid";

interface ITableGridProps {
    columns: any[],
    rows: any
    pageSize: number,
}

const TableGrid:FC<ITableGridProps> = ({columns, rows, pageSize}) => {
    const { setContentSort, setContentDefaultSort } = useActions();
    const [sortModel, setSortModel] = useState<GridSortItem[]>([{ field: 'id', sort: 'desc' }]);

    const handleSortChange = (sortArray: any) => {
        if(sortArray.length) {
            const field = sortArray[0].field;
            const sort = sortArray[0].sort;
            setSortModel([{field, sort}]);
            setContentSort({field, sort: sort.toUpperCase() });
        } else {
            setContentDefaultSort();
            setSortModel([]);
        }
    }

    return (
        <div style={{ height: 860, width: "100%", marginBottom: "10px"}}>
            {/* <Button sx={{ width: 259 }} onClick={order} variant="contained">
                Добавить
            </Button> */}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[]}
                onSortModelChange={handleSortChange}
                checkboxSelection
                style={{ marginBottom: "40px" }}
                sortModel={sortModel}
                components={{Footer: PaginationGrid}}
            />
        </div>
    );
};

export default TableGrid;
