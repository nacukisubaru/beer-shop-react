import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import PaginationGrid from "../../../../Grid/PaginationGrid";

const PaginationTable: FC = ({}) => {
    const { limitPage, disableNextPage, countRows, page } = useAppSelector(
        (state) => state.contentReducer
    );
    const {setContentPage, setLimitPage} = useActions();

    const handleSetPage = (page: number) => {
        setContentPage({page});
    }

    const handleSetLimitPage = (limit:number) => {
        setLimitPage({limit});
    }

    return (
        <PaginationGrid
            defaultLimitPage={countRows < limitPage ? countRows : limitPage}
            disableNextPage={disableNextPage}
            defaultPage={page}
            customSetPage={handleSetPage}
            customSetLimitPage={handleSetLimitPage}
        ></PaginationGrid>
    );
};

export default PaginationTable;
