import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import PaginationGrid from "./PaginationGrid";

interface ITableGridProps {
    columns: any[],
    rows: any
    pageSize: number,
}

const TableGrid:FC<ITableGridProps> = ({columns, rows, pageSize}) => {
    const {setContentSort, setContentDefaultSort} = useActions();
    const handleSortChange = (sortArray: any) => {
        console.log(sortArray);
        if(sortArray.length) {
            setContentSort({field: sortArray[0].field, sort: sortArray[0].sort.toUpperCase() });
        } else {
            setContentDefaultSort();
        }
    }

    return (
        <div style={{ height: 800, width: "100%", marginBottom: "10px"}}>
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
                sortModel={[{field: 'id', sort: 'desc'}]}
                components={{Footer: PaginationGrid}}  
            />
        </div>
    );
};

export default TableGrid;
