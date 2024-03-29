import { FC, useEffect, useState } from "react";
import { useActions } from "../../app/hooks/useActions";
import { useCatalog } from "../../app/hooks/useCatalog";
import { orderUserApi } from "../../app/store/services/order/order.api";
import { IBasketOrderProduct } from "../../app/store/services/order/types/order.types";
import { useTableAction } from "../../app/hooks/useTableAction";
import { GetServerSideProps } from "next";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../../app/store/reducers/header.slice";
import { wrapper } from "../../app/store/store";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import BasketTable from "../../app/components/Admin/WorkSpace/WorkTools/Tables/BasketTable";
import TableAdmin from "../../app/components/Admin/WorkSpace/WorkTools/Tables/Table";
import Head from "next/head";
import Menu from "../../app/components/Drawer/Menu/Menu";

var moment = require("moment"); // require

const Orders: FC = () => {
    const { rows, clearStateResponse, stateResponse } =
        useCatalog(orderUserApi);
    const { openModalAddContent } = useActions();
    const { closeTableModal } = useTableAction({});
    const { setShowFilterInTool } = useActions();

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

    useEffect(() => {
        setShowFilterInTool({ show: false });
    });

    return (
        <>
            <Head>
                <title>Мои заказы</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <Menu
                filterList={[]}
                productType="beers"
            />
            <div style={{ margin: "15px" }}>
                <TableAdmin
                    columns={[
                        { field: "id", headerName: "Номер заказа", width: 150 },
                        {
                            field: "createdAt",
                            headerName: "Дата время заказа",
                            width: 400,
                            renderFunc: (params: any) =>
                                moment(params.row.createdAt).format(
                                    "DD.MM.YYYY HH:mm"
                                ),
                        },
                        {
                            field: "statusId",
                            headerName: "Статус",
                            width: 550,
                            renderFunc: (params: any) => (
                                <div
                                    className="status-order"
                                    style={{
                                        backgroundColor:
                                            params.row.status.color,
                                    }}
                                >
                                    {params.row.status.statusName}
                                </div>
                            ),
                        },
                        { field: "amount", headerName: "Сумма", width: 550 },
                    ]}
                    tableProps={{ rows, clearStateResponse, stateResponse }}
                    modalProps={{
                        childrenModal: <BasketTable products={basket} />,
                        titleModal: "Просмотр корзины",
                        width: "md",
                        closeModal: closeTableModal,
                    }}
                    actionButtons={[
                        {
                            color: "primary",
                            size: "small",
                            onClick: showProducts,
                            icon: <ShoppingBasketIcon />,
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default Orders;
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props = {
            data: { 
            },
        };

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        return {
            props,
        };
    });
