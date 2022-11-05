import { useEffect, useState } from "react";
import AdminPanel from "../../../../app/components/Admin/WorkSpace/AdminPanel";
import { createBeersList } from "../../../../app/helpers/arrayHelper";
import { beerApi } from "../../../../app/store/services/beers/beer.api";
import { IBeerProduct } from "../../../../app/store/services/beers/types/beer.type";

export default function BeerAdmin() {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Название", width: 200 },
        { field: "description", headerName: "Описание", width: 150 },
        { field: "price", headerName: "Цена", width: 150 },
        { field: "quantity", headerName: "Количество", width: 150 },
        { field: "isActive", headerName: "Активность", width: 150 },
        { field: "inStock", headerName: "В наличии", width: 150 },
        { field: "brandName", headerName: "Название бренда", width: 150 },
        { field: "typePackagingName", headerName: "Тип упаковки", width: 150 },
        { field: "compound", headerName: "Состав", width: 150 },
        { field: "volume", headerName: "Объем", width: 150 },
        { field: "fortress", headerName: "Крепкость", width: 150 },
        { field: "ibu", headerName: "ibu", width: 150 },
        { field: "forBottling", headerName: "На розлив", width: 150 },
        { field: "filtred", headerName: "Фильтрованное", width: 150 },
    ];

    const {data} = beerApi.useGetBeersQuery(0);
    const [rows, setRows] = useState<IBeerProduct[]>([]);

    useEffect(() => {
        if(data && data.rows) {
            const rows = createBeersList(data.rows);
            setRows(rows);
        }
    }, [data]);

    return (
        <>
            <AdminPanel columnsTable={columns} rowsTable={rows} toolInWorkSpace={true}></AdminPanel>
        </>
    );
}