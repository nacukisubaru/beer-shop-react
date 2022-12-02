import { useCatalog } from "../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import { typePackagingApi } from "../../../../../store/services/type-packaging/type-packaging.api";
import TypePackagingFilterTable from "../Filters/TypePackagingFilterTable";
import AddTypePackagingForm from "../Forms/Additional/TypesPackaging/AddTypePackagingForm";
import UpdTypePackagingForm from "../Forms/Additional/TypesPackaging/UpdTypePackagingForm";
import TableAdmin from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTableAction } from "../../../../../hooks/useTableAction";

export default function TypePackagingTableAdmin() {
    const { rows, addRow, updRow, removeRow, clearStateResponse, stateResponse } = useCatalog(typePackagingApi, 'brand');
    const { rowEdit, closeTableModal, rowDelete, isUpdAction, message } = useTableAction({
        successMessage: "Тип упаковки успешно добавлен",
        successMessageUpd: "Тип упаковки успешно обновлен",
        successMessageRemove: "Тип упаковки успешно удален"
    });    

    const handleDelete = (params:any) => {
        rowDelete(params, removeRow);
    }

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "name", headerName: "Название", width: 200 },
                { field: "productTypeName", headerName: "Тип товара", width: 200 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? <UpdTypePackagingForm submit={updRow} /> : <AddTypePackagingForm submit={addRow} />,
                titleModal: isUpdAction ? "Добавить тип товара" : "Обновить тип товара",
                successMessage: message,
                closeModal: closeTableModal
            }}
            actionButtons={[
                {color: "primary", size: "small", onClick: rowEdit, icon: <EditIcon />},
                {color: "primary", size: "small", onClick: handleDelete, icon: <DeleteIcon />}
            ]}
            filterPanel={TypePackagingFilterTable}
        />
    );
}