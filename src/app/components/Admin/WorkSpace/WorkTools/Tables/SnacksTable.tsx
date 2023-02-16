import { useCatalog } from "../../../../../hooks/useCatalog";
import { snackApi } from "../../../../../store/services/snacks/snack.api";
import { useTableAction } from "../../../../../hooks/useTableAction";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import { typePackagingApi } from "../../../../../store/services/type-packaging/type-packaging.api";
import SnackFilterTable from "../Filters/SnackFilterTable";
import AddSnackForm from "../Forms/Products/Snacks/AddSnackForm";
import UpdSnackForm from "../Forms/Products/Snacks/UpdSnackForm";
import EditIcon from "@mui/icons-material/Edit";
import TableAdmin from "./Table";

export default function SnacksTableAdmin() {
    const brandsList = brandApi.useGetListByProductTypeQuery("snacks");
    const packagingList =
        typePackagingApi.useGetListByProductTypeQuery("snacks");
    const { rows, addRow, updRow, clearStateResponse, stateResponse } =
        useCatalog(snackApi, "snack");
    const { rowEdit, closeTableModal, isUpdAction, message } = useTableAction({
        successMessage: "Товар успешно добавлен",
        successMessageUpd: "Товар успешно обновлен",
        successMessageRemove: "Товар успешно удален",
    });

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "title", headerName: "Название", width: 250 },
                { field: "description", headerName: "Описание", width: 400 },
                { field: "price", headerName: "Цена", width: 150 },
                {
                    field: "quantity",
                    headerName: "Количество",
                    width: 150,
                    filterable: false,
                },
                { field: "weight", headerName: "Вес", width: 90 },
                { field: "isActive", headerName: "Активность", width: 150 },
                { field: "inStock", headerName: "В наличии", width: 150 },
                {
                    field: "brandName",
                    headerName: "Название бренда",
                    width: 150,
                },
                {
                    field: "typePackagingName",
                    headerName: "Тип упаковки",
                    width: 200,
                },
                { field: "isPromote", headerName: "Выводить на главной?", width: 180 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? (
                    <UpdSnackForm 
                    brandsList={brandsList.data ? brandsList.data : []}
                    packagingList={
                        packagingList.data ? packagingList.data : []
                    }
                    submit={updRow} />
                ) : (
                    <AddSnackForm
                        brandsList={brandsList.data ? brandsList.data : []}
                        packagingList={
                            packagingList.data ? packagingList.data : []
                        }
                        submit={addRow}
                    />
                ),
                titleModal: isUpdAction
                    ? "Обновить закуску"
                    : "Добавить закуску",
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
            ]}
            filterPanel={SnackFilterTable}
        />
    );
}
