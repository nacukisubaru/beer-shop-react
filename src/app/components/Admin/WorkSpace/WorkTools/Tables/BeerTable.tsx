import { beerApi } from "../../../../../store/services/beers/beer.api";
import TableAdmin from "./Table";

export default function BeerTableAdmin() {
    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "title", headerName: "Название", width: 200 },
                { field: "description", headerName: "Описание", width: 150 },
                { field: "price", headerName: "Цена", width: 150 },
                { field: "quantity", headerName: "Количество", width: 150, filterable: false },
                { field: "isActive", headerName: "Активность", width: 150 },
                { field: "inStock", headerName: "В наличии", width: 150 },
                { field: "brandName", headerName: "Название бренда", width: 150 },
                { field: "typePackagingName", headerName: "Тип упаковки", width: 150 },
                { field: "compound", headerName: "Состав", width: 150, filterable: false },
                { field: "volume", headerName: "Объем", width: 150, filterable: false },
                { field: "fortress", headerName: "Крепкость", width: 150, filterable: false },
                { field: "ibu", headerName: "ibu", width: 150, filterable: false },
                { field: "forBottling", headerName: "На розлив", width: 150 },
                { field: "filtred", headerName: "Фильтрованное", width: 150 },
            ]}
            api={beerApi}
            entityName='beer'
            modalTitle="Добавить пиво"
            successMessage="Товар успешно добавлен"
        />
    );
}
