import { useEffect, useState } from "react";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { useTableAction } from "../../../../../hooks/useTableAction";
import { orderApi } from "../../../../../store/services/order/order.api";
import { IBasketOrderProduct } from "../../../../../store/services/order/types/order.types";
import { useActions } from "../../../../../hooks/useActions";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import TableAdmin from "./Table";
import BasketTable from "./BasketTable";
import OrderFilterTable from "../Filters/OrderFilterTable";
import EditIcon from '@mui/icons-material/Edit';
import OrderForm from "../Forms/Order/OrderForm";

export default function OrderTableAdmin() {
    const { rows, clearStateResponse, updRow, stateResponse } = useCatalog(orderApi);
    const { openModalAddContent } = useActions();
    const { closeTableModal, message, rowEdit, isUpdAction } = useTableAction({
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

    const showProducts = (params: any) => {
        const id = params.row.id;
        setBasket(baskets.get(id));
        openModalAddContent();
    };

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                {
                    field: "statusId",
                    headerName: "Статус",
                    width: 200,
                    renderFunc: (params: any) => <div className="status-order" style={{backgroundColor: params.row.status.color}} >{params.row.status.statusName}</div>
                },
                {
                    field: "fio",
                    headerName: "ФИО покупателя",
                    width: 150,
                },
                {
                    field: "phone",
                    headerName: "Номер покупателя",
                    width: 150,
                },
                {
                    field: "email",
                    headerName: "Email покупателя",
                    width: 150,
                },
                { field: "amount", headerName: "Сумма", width: 150 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? <OrderForm submit={updRow} /> : <BasketTable products={basket} />,
                titleModal: isUpdAction ? "Изменить статус заказа" : "Просмотр корзины",
                successMessage: message,
                width: "md",
                closeModal: closeTableModal,
            }}
            actionButtons={[
                {color: "primary", size: "small", onClick: rowEdit, icon: <EditIcon />},
                {
                    color: "primary",
                    size: "small",
                    onClick: showProducts,
                    icon: <ShoppingBasketIcon />,
                },
            ]}
            filterPanel={OrderFilterTable}
        />
    );
}
