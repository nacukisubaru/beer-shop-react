import { FC, useEffect } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../hooks/useCatalog";
import { IButtonOption } from "../../../../../types/ui.types";
import CustomSnackBar from "../../../../CustomUI/CustomSnackBar/CustomSnackBar";
import TableGrid from "../../../../Grid/TableGrid";
import AddContentModal from "../../../../Modals/Admin/AddContent";
import ResultNotFoundByFilter from "../../../../Modals/Messages/ResultNotFoundByFilter";
import PaginationTable from "../Pagination/PaginationTable";
import Action from "../Actions/Action";
interface IColumn {
    field: string;
    headerName: string;
    width: number;
    filterable?: boolean;
}

interface ITableProps {
    rows: any[];
    stateResponse: IStateResponse;
    tableHeight?: number;
    clearStateResponse: () => void;
}

interface IModalProps {
    titleModal: string;
    successMessage: string;
    childrenModal: any;
    width: 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl';
    closeModal: () => void;
}

interface TableAdminProps {
    columns: IColumn[];
    tableProps: ITableProps;
    modalProps: IModalProps;
    actionButtons?: IButtonOption[];
    filterPanel: any;
}

const TableAdmin: FC<TableAdminProps> = ({
    columns,
    tableProps,
    modalProps,
    actionButtons,
    filterPanel
}) => {
    const { rows, stateResponse, clearStateResponse } = tableProps;
    const { limitPage } = useAppSelector((state) => state.contentReducer);
    const {
        setFilters,
        setRequestFilterDisabled,
        openAdminModalNotFoundByFilter,
        closeAdminModalNotFoundByFilter,
    } = useActions();

    const { tmpfilters } = useAppSelector((state) => state.contentReducer);
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.adminModalNotFoundByFilter
    );
    
    const handlerPanelOpen = async () => {
        await setRequestFilterDisabled({ disable: true });
        setFilters(tmpfilters);
    };

    const handlerPanelClose = () => {
        setRequestFilterDisabled({ disable: false });
    };

    useEffect(() => {
        console.log(modalProps.successMessage)
    }, [modalProps])

    return (
        <>
            <TableGrid
                columns={
                    !actionButtons
                        ? columns
                        : [
                              ...columns,
                              {
                                  field: "action",
                                  headerName: "Действия",
                                  width: 150,
                                  renderCell: (params: any) => (
                                    <Action buttons={actionButtons} paramsAction={params}/>
                                  ),
                              },
                          ]
                }
                rows={rows}
                pageSize={limitPage}
                CustomFilterPanel={filterPanel}
                Pagination={PaginationTable}
                toolBarOn={true}
                sortingOnChange={true}
                tableHeight={tableProps.tableHeight}
                onFilterPanelOpen={handlerPanelOpen}
                onFilterPanelClose={handlerPanelClose}
            />
            <AddContentModal
                form={ modalProps.childrenModal }
                title={ modalProps.titleModal }
                width={ modalProps.width }
                onClose={modalProps.closeModal}
            />
            <CustomSnackBar
                severity="error"
                message={stateResponse.response.data?.message}
                isOpen={stateResponse.status === "rejected" ? true : false}
                onClose={clearStateResponse}
            />
            <CustomSnackBar
                severity="success"
                message={modalProps.successMessage}
                isOpen={stateResponse.status === "fulfilled" ? true : false}
                onClose={clearStateResponse}
            />
            <ResultNotFoundByFilter
                openModalNotFoundByFilter={openAdminModalNotFoundByFilter}
                closeModalNotFoundByFilter={closeAdminModalNotFoundByFilter}
                isOpen={isOpen}
            />
        </>
    );
};

export default TableAdmin;
