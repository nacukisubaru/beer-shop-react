import { useCatalog } from "../../../../../hooks/useCatalog";
import { beerApi } from "../../../../../store/services/beers/beer.api";
import AddBeerForm from "../Forms/Products/AddBeerForm";
import UpdBeerForm from "../Forms/Products/UpdBeerForm";
import TableAdmin from "./Table";

export default function BeerTableAdmin() {
    const { rows, addRow, updRow, clearStateResponse, stateResponse } = useCatalog(
        beerApi,
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
                },
                {
                    field: "compound",
                    headerName: "Состав",
                    width: 150,
                    filterable: false,
                },
                {
                    field: "volume",
                    headerName: "Объем",
                    width: 150,
                    filterable: false,
                },
                {
                    field: "fortress",
                    headerName: "Крепкость",
                    width: 150,
                    filterable: false,
                },
                {
                    field: "ibu",
                    headerName: "ibu",
                    width: 150,
                    filterable: false,
                },
                { field: "forBottling", headerName: "На розлив", width: 150 },
                { field: "filtered", headerName: "Фильтрованное", width: 150 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModalForAdd: <AddBeerForm submit={addRow} />,
                childrenModalForUpd: <UpdBeerForm submit={updRow} />,
                titleModalForAdd: "Добавить пиво",
                titleModalForUpd: "Обновить пиво",
                successMessage: "Товар успешно добавлен",
            }}
            actions={{hasEdit: true}}
        />
    );
}
