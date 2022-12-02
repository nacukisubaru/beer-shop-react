import { useEffect, useState } from "react";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { beerApi } from "../../../../../store/services/beers/beer.api";
import BeerFilterTable from "../Filters/BeerFilterTable";
import AddBeerForm from "../Forms/Products/Beers/AddBeerForm";
import UpdBeerForm from "../Forms/Products/Beers/UpdBeerForm";

import TableAdmin from "./Table";

export default function OrderTableAdmin() {
    const { rows, addRow, updRow, clearStateResponse, stateResponse } = useCatalog(
        beerApi,
        "beer"
    );
    
    const [products, setProducts] = useState(new Map());

    useEffect(() => {
        const productsMap = new Map();
        rows.map((row) => {
            productsMap.set(row.id, row.products);
        });
        setProducts(productsMap);
    }, [rows]);

    return (
        <></>
        // <TableAdmin
        //     columns={[
        //         { field: "id", headerName: "ID", width: 70 },
        //         { field: "userId", headerName: "ID пользователя", width: 200 },
        //         { field: "customerName", headerName: "Имя покупателя", width: 150 },
        //         { field: "customerSurname", headerName: "Фамилия покупателя", width: 150 },
        //         { field: "customerPhone", headerName: "Номер покупателя", width: 150 },
        //         { field: "customerEmail", headerName: "Email покупателя", width: 150 },
        //         { field: "amount", headerName: "Сумма", width: 150 },
        //         { field: "status", headerName: "Статус", width: 150 },
        //     ]}
        //     tableProps={{ rows, clearStateResponse, stateResponse }}
        //     modalProps={{
        //         childrenModalForAdd: <AddBeerForm submit={addRow} />,
        //         childrenModalForUpd: <UpdBeerForm submit={updRow} />,
        //         titleModalForAdd: "Добавить пиво",
        //         titleModalForUpd: "Обновить пиво",
        //         successMessage: "Товар успешно добавлен",
        //         successMessageUpd: "Товар успешно обновлен",
        //         successMessageRemove: "Товар успешно удален"
        //     }}
        //   //  actions={{hasEdit: true}}
        //     filterPanel={BeerFilterTable}
        // />
    );
}