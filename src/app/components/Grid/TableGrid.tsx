import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import PaginationGrid from "./PaginationGrid";

interface ITableGridProps {
    columns: any[],
    rows: any
    pageSize: number,
}

const TableGrid:FC<ITableGridProps> = ({columns, rows, pageSize}) => {
    return (
        <div style={{ height: 800, width: "100%", marginBottom: "10px"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[]}
                checkboxSelection
                style={{ marginBottom: "40px" }}
            />
            <PaginationGrid/>
        </div>
    );
};

export default TableGrid;
