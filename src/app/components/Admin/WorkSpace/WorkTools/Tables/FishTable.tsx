import { FC } from "react";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { useTableAction } from "../../../../../hooks/useTableAction";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import { typePackagingApi } from "../../../../../store/services/type-packaging/type-packaging.api";
import { fishApi, fishTypesApi } from "../../../../../store/services/fish/fish.api";
import UpdFishForm from "../Forms/Products/Fish/UpdFishForm";
import AddFishForm from "../Forms/Products/Fish/AddFishForm";
import TableAdmin from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import FishFilterTable from "../Filters/FishFilterTable";

const FishTableAdmin: FC = () => {
    const brandsList = brandApi.useGetListByProductTypeQuery("fish");
    const packagingList = typePackagingApi.useGetListByProductTypeQuery("fish");
    const fishTypesList = fishTypesApi.useGetListQuery({});
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
                { field: "title", headerName: "Название", width: 200 },
                { field: "description", headerName: "Описание", width: 200 },
                {
                    field: "brandName",
                    headerName: "Название бренда",
                    width: 200,
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
                { field: "isPromote", headerName: "Выводить на главной?", width: 180 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? (
                    <UpdFishForm
                    brandsList={brandsList.data ? brandsList.data : []}
                    packagingList={
                        packagingList.data ? packagingList.data : []
                    }
                    fishTypesList={fishTypesList.data ? fishTypesList.data: []}
                    submit={updRow} />
                ) : (
                    <AddFishForm
                        brandsList={brandsList.data ? brandsList.data : []}
                        packagingList={
                            packagingList.data ? packagingList.data : []
                        }
                        fishTypesList={fishTypesList.data ? fishTypesList.data: []}
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
           filterPanel={FishFilterTable}
        />
    );
}

export default FishTableAdmin;