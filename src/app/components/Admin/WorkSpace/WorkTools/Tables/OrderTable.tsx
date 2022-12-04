import { useEffect, useState } from "react";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { useTableAction } from "../../../../../hooks/useTableAction";
import { orderApi } from "../../../../../store/services/order/order.api";
import { IBasketOrderProduct } from "../../../../../store/services/order/types/order.types";
import { useActions } from "../../../../../hooks/useActions";
import BeerFilterTable from "../Filters/BeerFilterTable";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import TableAdmin from "./Table";
import BasketTable from "./BasketTable";
import OrderFilterTable from "../Filters/OrderFilterTable";

export default function OrderTableAdmin() {
    const { rows, clearStateResponse, stateResponse } = useCatalog(orderApi);
    const {openModalAddContent} = useActions();
    const { closeTableModal, message } = useTableAction({
        successMessage: "Статус заказа обновлен",
    });

    const [baskets, setBaskets] = useState(new Map());
    const [basket, setBasket] = useState<IBasketOrderProduct[]>([]);

    useEffect(() => {
        const productsMap = new Map();
        rows.map((row) => {
            productsMap.set(row.id, row.products);
        });
        setBaskets(productsMap);
    }, [rows]);

    const showProducts = (params:any) => {
        const id = params.row.id;
        setBasket(baskets.get(id));
        openModalAddContent();
    }

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "userId", headerName: "ID пользователя", width: 200 },
                { field: "customerName", headerName: "Имя покупателя", width: 150 },
                { field: "customerSurname", headerName: "Фамилия покупателя", width: 150 },
                { field: "customerPhone", headerName: "Номер покупателя", width: 150 },
                { field: "customerEmail", headerName: "Email покупателя", width: 150 },
                { field: "amount", headerName: "Сумма", width: 150 },
                // { field: "status", headerName: "Статус", width: 150 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: <BasketTable products={basket} />,
                titleModal: "Просмотр корзины",
                successMessage: message,
                width:"md",
                closeModal: closeTableModal
            }}
            actionButtons={[
                // {color: "primary", size: "small", onClick: rowEdit, icon: <EditIcon />},
                {color: "primary", size: "small", onClick: showProducts, icon: <ShoppingBasketIcon />}
            ]}
            filterPanel={OrderFilterTable}
        />
    );
}