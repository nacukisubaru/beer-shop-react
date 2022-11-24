import { useCatalog } from "../../../../../hooks/useCatalog";
import { snackApi } from "../../../../../store/services/snacks/snack.api";
import SnackFilterTable from "../Filters/SnackFilterTable";
import AddBeerForm from "../Forms/Products/Beers/AddBeerForm";
import UpdBeerForm from "../Forms/Products/Beers/UpdBeerForm";
import AddSnackForm from "../Forms/Products/Snacks/AddSnackForm";
import UpdSnackForm from "../Forms/Products/Snacks/UpdSnackForm";

import TableAdmin from "./Table";

export default function SnacksTableAdmin() {
    const { rows, addRow, updRow, clearStateResponse, stateResponse } = useCatalog(
        snackApi,
        "beer"
    );
    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "title", headerName: "Название", width: 200 },
                { field: "description", headerName: "Описание", width: 150 },
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
                    width: 150,
                }
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModalForAdd: <AddSnackForm submit={addRow} />,
                childrenModalForUpd: <UpdSnackForm submit={updRow} />,
                titleModalForAdd: "Добавить закуску",
                titleModalForUpd: "Обновить закуску",
                successMessage: "Товар успешно добавлен",
            }}
            actions={{hasEdit: true}}
            filterPanel={SnackFilterTable}
        />
    );
}
