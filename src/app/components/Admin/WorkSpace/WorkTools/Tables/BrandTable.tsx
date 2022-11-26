import { useCatalog } from "../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import BrandFilterTable from "../Filters/BrandFilterTable";
import AddBrandForm from "../Forms/Additional/Brands/AddBrandForm";
import UpdBrandForm from "../Forms/Additional/Brands/UpdBrandForm";
import TableAdmin from "./Table";

export default function BrandTableAdmin() {
    const { rows, addRow, updRow, removeRow, clearStateResponse, stateResponse } = useCatalog(brandApi, 'brand');
    
    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "name", headerName: "Название", width: 200 },
                { field: "productTypeName", headerName: "Тип продукта", width: 200 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModalForAdd: <AddBrandForm submit={addRow} />,
                childrenModalForUpd: <UpdBrandForm submit={updRow} />,
                titleModalForAdd: "Добавить бренд",
                titleModalForUpd: "Обновить бренд",
                successMessage: "Бренд успешно добавлен",
            }}
            actions={{hasEdit: true, hasRemove: true, remove: removeRow}}
            filterPanel={BrandFilterTable}
        />
    );
}
