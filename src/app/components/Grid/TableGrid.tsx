import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";

interface ITableGridProps {
    columns: any[],
    rows: any
}

const TableGrid:FC<ITableGridProps> = ({columns, rows}) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[]}
            checkboxSelection
            style={{ marginBottom: "40px" }}
        />
    );
};

export default TableGrid;
