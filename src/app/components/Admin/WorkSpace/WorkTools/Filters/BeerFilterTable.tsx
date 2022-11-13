import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const BeerFilterTable: FC = () => {
    const { setTmpFilter, removeTmpFilter } = useActions();
    const { filters } = useAppSelector(state => state.contentReducer);

    const handleSetFilter = (name: string, value: number | string | number[] | string[]) => {
        setTmpFilter({name, value});
    }

 
    const handleRemoveFilter = (name: string) => {
        removeTmpFilter({name});
    }

    return (
        <FilterPanelGrid
            itemFilterList={[
                { field: "id", fieldName: "ID", inputNumber: true },
                { field: "title", fieldName: "Название", inputText: true },
                {
                    field: "description",
                    fieldName: "Описание",
                    inputText: true,
                },
                {
                    field: "price",
                    fieldName: "Цена",
                    inputRange: {
                        min: 1000,
                        max: 2000,
                        fieldMin: "minPrice",
                        fieldMax: "maxPrice",
                        nameMin: "Мин цена",
                        nameMax: "Макс цена",
                    },
                },
                {
                    field: "brandIds",
                    fieldName: "Бренды",
                    inputSelect: {
                        valueInputSelect: [
                            { id: 5, name: "Балтика", value: "Baltika" },
                            { id: 6, name: "Гусь", value: "Goose" },
                        ],
                        multiple: true,
                    },
                },
                {
                    field: "isActive",
                    fieldName: "Активность",
                    inputSelectBoolean: {
                        trueName: "Активные",
                        trueValue: "true",
                        falseName: "Не активные",
                        falseValue: "false",
                    },
                },
            ]}
            filters={filters}
            setCustomFilter={handleSetFilter}
            removeCustomFilter={handleRemoveFilter}
            width={300}
            onFilter={() => {}}
        />
    );
};

export default BeerFilterTable;
