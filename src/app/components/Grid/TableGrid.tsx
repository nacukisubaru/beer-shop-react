import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";

interface ITableGridProps {
    columns: any[],
    rows: any
}

const TableGrid:FC<ITableGridProps> = ({columns, rows}) => {
    return (
        <div style={{ height: 647, width: "100%", marginBottom: "10px"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[]}
                checkboxSelection
                style={{ marginBottom: "40px" }}
            />
        </div>
    );
};

export default TableGrid;
