import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
interface IRowsRange {
    from: number,
    to: number
}
interface PaginationGridProps {
    defaultLimitPage: number,
    disableNextPage: boolean,
    customSetLimitPage: (limit: number) => void,
    customSetPage: (page: number) => void
}

const PaginationGrid: FC<PaginationGridProps> = ({defaultLimitPage, disableNextPage, customSetLimitPage, customSetPage}) => {
    const { countRows, lastPage } = useAppSelector((state) => state.contentReducer);
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [limitPage, setLimitPage] = React.useState<number>(defaultLimitPage);
    const [rowsRange, setRowsRange] = React.useState<IRowsRange>({from: 1, to:  limitPage });
    const [lastNum, setLastNum] = React.useState<number>(0);
    const [firstNum, setFirstNum] = React.useState<number>(0);
    const [nextBtnDisabled, setNextBtnDisable] = React.useState<boolean>(disableNextPage);

    React.useEffect(() => {
        setLimitPage(defaultLimitPage);
        setRowsRange({from: 1, to: defaultLimitPage});
    }, [defaultLimitPage])
    
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        let from = rowsRange.from;
        let to = rowsRange.to;

        if(newPage < page) {
            from = from - limitPage;
            to = to - limitPage;
        } else {
            from = from + limitPage;
            to = to + limitPage;
        }
        
        if(newPage > page && newPage === lastPage - 1) {
            setLastNum(to);
        }
        
        if(newPage < lastPage && rowsRange.from === countRows) {
            to = countRows - 1;
        } else if(newPage === lastPage) {
            to = countRows;
        }

        if(newPage < page && newPage === lastPage - 1) {
            to = lastNum;
        }
        
        if(newPage === 0 && firstNum) {
            to = firstNum;
        }

        customSetPage(newPage);
        setPage(newPage);
        setRowsRange({from, to});
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const perPageVal = parseInt(event.target.value, 10);
        if(perPageVal >= countRows) {
            setNextBtnDisable(true);
        } else {
            setNextBtnDisable(false);
        }
        setFirstNum(perPageVal);
        customSetPage(0);
        setRowsRange({from: 1, to: perPageVal});
        customSetLimitPage(perPageVal);
        setRowsPerPage(perPageVal);
        setPage(0);
    };

    const defaultLabelDisplayedRows = () => {
        return `${rowsRange.from}–${rowsRange.to} of ${countRows}`;
    }

    return (
        <TablePagination
            component="div"
            count={countRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{disabled: rowsRange.to === countRows || nextBtnDisabled ? true : false}}
            labelDisplayedRows={defaultLabelDisplayedRows}
        />
    );
}

export default PaginationGrid;