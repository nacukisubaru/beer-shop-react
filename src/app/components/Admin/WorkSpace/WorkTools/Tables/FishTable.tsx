import { FC } from "react";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { useTableAction } from "../../../../../hooks/useTableAction";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import { typePackagingApi } from "../../../../../store/services/type-packaging/type-packaging.api";
import { fishApi } from "../../../../../store/services/fish/fish.api";
import UpdFishForm from "../Forms/Products/Fish/UpdFishForm";
import AddFishForm from "../Forms/Products/Fish/AddFishForm";
import TableAdmin from "./Table";
import EditIcon from "@mui/icons-material/Edit";

const FishTableAdmin: FC = () => {
    const brandsList = brandApi.useGetListByProductTypeQuery("fish");
    const packagingList = typePackagingApi.useGetListByProductTypeQuery("fish");
    const { rows, addRow, updRow, clearStateResponse, stateResponse } = useCatalog(fishApi, "fish");
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
                {
                    field: "fishTypeId",
                    headerName: "Вид рыбы",
                    width: 200,
                },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? (
                    <UpdFishForm
                    brandsList={brandsList.data ? brandsList.data : []}
                    packagingList={
                        packagingList.data ? packagingList.data : []
                    }
                    submit={updRow} />
                ) : (
                    <AddFishForm
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
           // filterPanel={SnackFilterTable}
        />
    );
}

export default FishTableAdmin;