import { Box } from "@mui/system";
import { FC, useEffect } from "react";
import { limitPageAdmin } from "../../../../../http/http.request.config";
import { IBasketOrderProduct } from "../../../../../store/services/order/types/order.types";
import TableGrid from "../../../../Grid/TableGrid";

interface IBasketTable {
    products: IBasketOrderProduct[];
}

const BasketTable: FC<IBasketTable> = ({ products }) => {
    return (
        <TableGrid
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "name", headerName: "Название", width: 320 },
                { field: "price", headerName: "Цена", width: 150 },
                { field: "quantity", headerName: "Количество", width: 120 },
                // { field: "remainder", headerName: "Остаток в баре", width: 120 },
                {
                    field: "image",
                    headerName: "Изображение",
                    width: 150,
                    renderCell: (params: any) => {
                        return (
                            <>
                                <Box
                                    style={{
                                        backgroundSize: "contain",
                                        height: "68px",
                                        width: "437px",
                                    }}
                                    sx={{
                                        background: `url(${params.row.imageLink}) center center no-repeat `,
                                    }}
                                ></Box>
                            </>
                        );
                    },
                },
            ]}
            rows={products}
            pageSize={limitPageAdmin}
            tableHeight={560}
        />
    );
};

export default BasketTable;
