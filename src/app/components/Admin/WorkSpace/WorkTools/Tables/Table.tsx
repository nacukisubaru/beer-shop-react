import { IconButton } from "@mui/material";
import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useCatalog } from "../../../../../hooks/useCatalog";
import CustomSnackBar from "../../../../CustomUI/CustomSnackBar/CustomSnackBar";
import TableGrid from "../../../../Grid/TableGrid";
import AddContentModal from "../../../../Modals/Admin/AddContent";
import ResultNotFoundByFilter from "../../../../Modals/Messages/ResultNotFoundByFilter";
import BeerFilterTable from "../Filters/BeerFilterTable";
import AddBeerForm from "../Forms/Products/AddBeerForm";
import PaginationTable from "../Pagination/PaginationTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IColumn {
    field: string,
    headerName: string,
    width: number,
    filterable?: boolean
}

interface TableAdminProps {
    columns: IColumn[],
    api: any,
    entityName: string,
    modalTitle: string,
    successMessage: string
}

const TableAdmin: FC<TableAdminProps> = ({columns, api, entityName, modalTitle, successMessage}) => {
    const { rows, addRow, clearStateResponse, stateResponse } = useCatalog(api, entityName);
    const { limitPage } = useAppSelector(state => state.contentReducer);
    const { setFilters, setRequestFilterDisabled, openAdminModalNotFoundByFilter, closeAdminModalNotFoundByFilter, openModalAddContent } = useActions();
    const { tmpfilters } = useAppSelector(state => state.contentReducer);
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.adminModalNotFoundByFilter
    );

    const handlerPanelOpen = async () => {
        await setRequestFilterDisabled({disable: true});
        setFilters(tmpfilters);
    }

    const handlerPanelClose = () => {
        setRequestFilterDisabled({disable: false});
    }

    return (
        <>
            <TableGrid
                columns={
                    [...columns,
                        {
                            field: "action",
                            headerName: "Действия",
                            width: 150,
                            renderCell: (params:any) => (
                                <strong>
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        component="span"
                                        onClick={() => {
                                            openModalAddContent();
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        component="span"
                                        onClick={() => {
                                         
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </strong>
                            ),
                        }
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
                form={<AddBeerForm submit={addRow}/>}
                title={modalTitle}
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
}

export default TableAdmin;