import { IconButton } from "@mui/material";
import { FC, useState } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { IStateResponse, useCatalog } from "../../../../../hooks/useCatalog";
import CustomSnackBar from "../../../../CustomUI/CustomSnackBar/CustomSnackBar";
import TableGrid from "../../../../Grid/TableGrid";
import AddContentModal from "../../../../Modals/Admin/AddContent";
import ResultNotFoundByFilter from "../../../../Modals/Messages/ResultNotFoundByFilter";
import BeerFilterTable from "../Filters/BeerFilterTable";
import AddBeerForm from "../Forms/Products/AddBeerForm";
import PaginationTable from "../Pagination/PaginationTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface IColumn {
    field: string;
    headerName: string;
    width: number;
    filterable?: boolean;
}

interface ITableProps {
    rows: any[];
    stateResponse: IStateResponse;
    clearStateResponse: () => void;
}

interface IModalProps {
    titleModalForAdd: string;
    titleModalForUpd: string;
    successMessage: string;
    childrenModalForAdd: any;
    childrenModalForUpd: any;
}

interface IAction {
    hasEdit?: boolean;
    hasRemove?: boolean;
}

interface TableAdminProps {
    columns: IColumn[];
    tableProps: ITableProps;
    modalProps: IModalProps;
    actions?: IAction;
}

const TableAdmin: FC<TableAdminProps> = ({
    columns,
    tableProps,
    modalProps,
    actions,
}) => {
    const { rows, stateResponse, clearStateResponse } = tableProps;
    const {
        titleModalForAdd,
        titleModalForUpd,
        successMessage,
        childrenModalForAdd,
        childrenModalForUpd
    } = modalProps;
    const { limitPage } = useAppSelector((state) => state.contentReducer);
    const {
        setFilters,
        setRequestFilterDisabled,
        openAdminModalNotFoundByFilter,
        closeAdminModalNotFoundByFilter,
        openModalAddContent,
    } = useActions();
    const { tmpfilters } = useAppSelector((state) => state.contentReducer);
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.adminModalNotFoundByFilter
    );
    const [isUpdAction, setUpdAction] = useState(false);

    const handlerPanelOpen = async () => {
        await setRequestFilterDisabled({ disable: true });
        setFilters(tmpfilters);
    };

    const handlerPanelClose = () => {
        setRequestFilterDisabled({ disable: false });
    };

    return (
        <>
            <TableGrid
                columns={
                    !actions
                        ? columns
                        : [
                              ...columns,
                              {
                                  field: "action",
                                  headerName: "Действия",
                                  width: 150,
                                  renderCell: (params: any) => (
                                      <strong>
                                          {actions.hasEdit && (
                                              <IconButton
                                                  color="primary"
                                                  size="small"
                                                  component="span"
                                                  onClick={async () => {
                                                        await setUpdAction(true);
                                                        openModalAddContent();
                                                  }}
                                              >
                                                  <EditIcon />
                                              </IconButton>
                                          )}

                                          {actions.hasRemove && (
                                              <IconButton
                                                  color="primary"
                                                  size="small"
                                                  component="span"
                                                  onClick={() => {}}
                                              >
                                                  <DeleteIcon />
                                              </IconButton>
                                          )}
                                      </strong>
                                  ),
                              },
                          ]
                }
                rows={rows}
                pageSize={limitPage}
                CustomFilterPanel={BeerFilterTable}
                Pagination={PaginationTable}
                onFilterPanelOpen={handlerPanelOpen}
                onFilterPanelClose={handlerPanelClose}
            />
            <AddContentModal
                form={ isUpdAction ? childrenModalForUpd : childrenModalForAdd }
                title={ isUpdAction ? titleModalForUpd : titleModalForAdd }
                onClose={()=>{setUpdAction(false)}}
            />
            <CustomSnackBar
                severity="error"
                message={stateResponse.response.data?.message}
                isOpen={stateResponse.status === "rejected" ? true : false}
                onClose={clearStateResponse}
            />
            <CustomSnackBar
                severity="success"
                message={successMessage}
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
