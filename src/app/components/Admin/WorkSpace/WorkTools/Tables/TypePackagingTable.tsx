import { useCatalog } from "../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import { typePackagingApi } from "../../../../../store/services/type-packaging/type-packaging.api";
import TypePackagingFilterTable from "../Filters/TypePackagingFilterTable";
import AddTypePackagingForm from "../Forms/Additional/TypesPackaging/AddTypePackagingForm";
import UpdTypePackagingForm from "../Forms/Additional/TypesPackaging/UpdTypePackagingForm";
import TableAdmin from "./Table";

export default function TypePackagingTableAdmin() {
    const { rows, addRow, updRow, removeRow, clearStateResponse, stateResponse } = useCatalog(typePackagingApi);

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "name", headerName: "Название", width: 200 },
                { field: "productType", headerName: "Тип товара", width: 200 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModalForAdd: <AddTypePackagingForm submit={addRow} />,
                childrenModalForUpd: <UpdTypePackagingForm submit={updRow} />,
                titleModalForAdd: "Добавить тип товара",
                titleModalForUpd: "Обновить тип товара",
                successMessage: "Тип упаковки успешно добавлен",
                successMessageUpd: "Тип упаковки успешно обновлен",
                successMessageRemove: "Тип упаковки успешно удален"
            }}
            actions={{hasEdit: true, hasRemove: true, remove: removeRow}}
            filterPanel={TypePackagingFilterTable}
        />
    );
}
