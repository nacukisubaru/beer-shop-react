import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { orderStatusApi } from "../../../../../store/services/order/order.api";
import { IOrderStatus } from "../../../../../store/services/order/types/order.types";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const OrderFilterTable: FC = () => {
    const { setFilter, removeFilter, resetFilters, filter} = useActions();
    const { tmpfilters } = useAppSelector(state => state.contentReducer);
    const statusList = orderStatusApi.useGetListQuery({});

    const handleSetFilter = (name: string, value: number | string | number[] | string[]) => {
        setFilter({name, value});
    }

    const handleRemoveFilter = (name: string) => {
        removeFilter({name});
    }

    return (
        <FilterPanelGrid
            itemFilterList={[
                { field: "orderId", fieldName: "ID заказа", inputNumber: true },
                { field: "customerFio", fieldName: "ФИО покупателя", inputText: true },
                { field: "customerPhone", fieldName: "Телефон покупателя", inputText: true },
                {
                    field: "statusId",
                    fieldName: "Статус",
                    inputSelect: {
                        valueInputSelect: statusList.data
                            ? statusList.data.map((item: IOrderStatus) => {
                                  return { name: item.statusName, value: item.id };
                              })
                            : [],
                    },
                },
            ]}
            filters={tmpfilters}
            setCustomFilter={handleSetFilter}
            removeCustomFilter={handleRemoveFilter}
            width={300}
            onFilter={filter}
            onReset={resetFilters}
        />
    );
};

export default OrderFilterTable;
