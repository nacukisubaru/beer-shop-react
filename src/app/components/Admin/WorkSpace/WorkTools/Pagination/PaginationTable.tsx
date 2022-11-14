import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import PaginationGrid from "../../../../Grid/PaginationGrid";

const PaginationTable: FC = ({}) => {
    const { limitPage, disableNextPage, countRows, lastPage } = useAppSelector(
        (state) => state.contentReducer
    );
    const {setContentPage, setLimitPage} = useActions();

    const handleSetPage = (page: number) => {
        setContentPage({page});
    }

    const handleSetLimitPage = (limit:number) => {
        setLimitPage({limit});
    }

    //  console.log({from: 1, to: countRows < limitPage ? countRows : limitPage})
    return (
        <PaginationGrid
            defaultLimitPage={countRows < limitPage ? countRows : limitPage}
            disableNextPage={disableNextPage}
            customSetPage={handleSetPage}
            customSetLimitPage={handleSetLimitPage}
        ></PaginationGrid>
    );
};

export default PaginationTable;
