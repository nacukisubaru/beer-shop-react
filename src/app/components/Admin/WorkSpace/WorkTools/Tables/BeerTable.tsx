import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { beerApi } from "../../../../../store/services/beers/beer.api";
import TableGrid from "../../../../Grid/TableGrid";
import BeerFilterTable from "../Filters/BeerFilterTable";

export default function BeerTableAdmin() {
    const columns = [
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
    ];
    const {rows} = useCatalog(beerApi, 'beer');
    const {limitPage} = useAppSelector(state => state.contentReducer);

    return (
        <>
            <TableGrid
                columns={columns}
                rows={rows}
                pageSize={limitPage}
                CustomFilterPanel={BeerFilterTable}
            />
        </>
    );
}
