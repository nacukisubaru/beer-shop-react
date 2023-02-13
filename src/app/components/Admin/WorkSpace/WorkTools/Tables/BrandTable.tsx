import { useCatalog } from "../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import BrandFilterTable from "../Filters/BrandFilterTable";
import AddBrandForm from "../Forms/Additional/Brands/AddBrandForm";
import UpdBrandForm from "../Forms/Additional/Brands/UpdBrandForm";
import TableAdmin from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTableAction } from "../../../../../hooks/useTableAction";

export default function BrandTableAdmin() {
    const { rows, addRow, updRow, removeRow, clearStateResponse, stateResponse } = useCatalog(brandApi, 'brand');
    const { rowEdit, closeTableModal, rowDelete, isUpdAction, message } = useTableAction({
        successMessage: "Бренд успешно добавлен",
        successMessageUpd: "Бренд успешно обновлен",
        successMessageRemove: "Бренд успешно удален"
    });

    const handleDelete = (params:any) => {
        rowDelete(params, removeRow);
    }

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 200 },
                { field: "name", headerName: "Название", width: 500 },
                { field: "productTypeName", headerName: "Тип продукта", width: 900 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? <UpdBrandForm submit={updRow} /> : <AddBrandForm submit={addRow} />,
                titleModal: isUpdAction ? "Обновить бренд" : "Добавить бренд",
                successMessage: message,
                width: "sm",
                closeModal: closeTableModal
            }}
            actionButtons={[
                {color: "primary", size: "small", onClick: rowEdit, icon: <EditIcon />},
                {color: "primary", size: "small", onClick: handleDelete, icon: <DeleteIcon />}
            ]}
            filterPanel={BrandFilterTable}
        />
    );
}
