import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

interface PaginationGridProps {
}

const PaginationGrid: FC<PaginationGridProps> = ({}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {setContentPage, enableNextPage} = useActions();
    const {disableNextPage} = useAppSelector((state) => state.contentReducer);
    
    const handleSetPage = (page: number) => {
        setContentPage({ page });
    };
    
    React.useEffect(()=>{
        if(disableNextPage) {
            setPage(page - 1);
        }
    }, [disableNextPage])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        if(disableNextPage) {
            enableNextPage();
        }
        handleSetPage(newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{disabled: disableNextPage}}
        />
    );
}

export default PaginationGrid;