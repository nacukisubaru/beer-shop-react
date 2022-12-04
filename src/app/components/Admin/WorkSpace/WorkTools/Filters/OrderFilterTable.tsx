import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const OrderFilterTable: FC = () => {
    const { setFilter, removeFilter, resetFilters, filter} = useActions();
    const { tmpfilters } = useAppSelector(state => state.contentReducer);

    const handleSetFilter = (name: string, value: number | string | number[] | string[]) => {
        setFilter({name, value});
    }

    const handleRemoveFilter = (name: string) => {
        removeFilter({name});
    }

    return (
        <FilterPanelGrid
            itemFilterList={[
                { field: "userId", fieldName: "ID покупателя", inputNumber: true },
                { field: "orderId", fieldName: "ID заказа", inputNumber: true },
                { field: "customerName", fieldName: "Имя покупателя", inputText: true },
                { field: "customerSurname", fieldName: "Фамилия покупателя", inputText: true },
                { field: "customerPhone", fieldName: "Телефон покупателя", inputText: true },
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
