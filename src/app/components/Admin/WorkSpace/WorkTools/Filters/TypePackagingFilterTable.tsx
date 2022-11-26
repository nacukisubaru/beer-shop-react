import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const TypePackagingFilterTable: FC = () => {
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
                { field: "id", fieldName: "ID", inputNumber: true },
                { field: "name", fieldName: "Название", inputText: true },
                {
                    field: "productTypeId",
                    fieldName: "Тип товара",
                    inputSelect: {
                        valueInputSelect: [
                            { name: "Пиво", value: 1 },
                            { name: "Закуски", value: 2 },
                        ],
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

export default TypePackagingFilterTable;
