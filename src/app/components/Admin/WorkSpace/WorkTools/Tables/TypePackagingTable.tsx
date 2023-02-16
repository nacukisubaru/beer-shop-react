import { useCatalog } from "../../../../../hooks/useCatalog";
import { typePackagingApi } from "../../../../../store/services/type-packaging/type-packaging.api";
import { useTableAction } from "../../../../../hooks/useTableAction";
import TypePackagingFilterTable from "../Filters/TypePackagingFilterTable";
import AddTypePackagingForm from "../Forms/Additional/TypesPackaging/AddTypePackagingForm";
import UpdTypePackagingForm from "../Forms/Additional/TypesPackaging/UpdTypePackagingForm";
import TableAdmin from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetProductTypesQuery } from "../../../../../store/services/product-types/product-types.api";

export default function TypePackagingTableAdmin() {
    const { data } = useGetProductTypesQuery({});
    const {
        rows,
        addRow,
        updRow,
        removeRow,
        clearStateResponse,
        stateResponse,
    } = useCatalog(typePackagingApi, "brand");
    const { rowEdit, closeTableModal, rowDelete, isUpdAction, message } =
        useTableAction({
            successMessage: "Тип упаковки успешно добавлен",
            successMessageUpd: "Тип упаковки успешно обновлен",
            successMessageRemove: "Тип упаковки успешно удален",
        });

    const handleDelete = (params: any) => {
        rowDelete(params, removeRow);
    };

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 100 },
                { field: "name", headerName: "Название", width: 500 },
                {
                    field: "productTypeName",
                    headerName: "Тип товара",
                    width: 1050,
                },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? (
                    <UpdTypePackagingForm submit={updRow} />
                ) : (
                    <AddTypePackagingForm
                        productTypes={data ? data : []}
                        submit={addRow}
                    />
                ),
                titleModal: isUpdAction
                    ? "Добавить тип упаковки"
                    : "Обновить тип упаковки",
                successMessage: message,
                width: "sm",
                closeModal: closeTableModal,
            }}
            actionButtons={[
                {
                    color: "primary",
                    size: "small",
                    onClick: rowEdit,
                    icon: <EditIcon />,
                },
                {
                    color: "primary",
                    size: "small",
                    onClick: handleDelete,
                    icon: <DeleteIcon />,
                },
            ]}
            filterPanel={TypePackagingFilterTable}
        />
    );
}
