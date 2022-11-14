import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const BeerFilterTable: FC = () => {
    const { setFilter, removeFilter, setRequestFilterDisabled, setFilters, setClickFilter, resetFilters} = useActions();
    const { filters, tmpfilters } = useAppSelector(state => state.contentReducer);

    const handleSetFilter = (name: string, value: number | string | number[] | string[]) => {
        setFilter({name, value});
    }

    const handleRemoveFilter = (name: string) => {
        removeFilter({name});
    }

    const handleFilter = async() => {
       await setRequestFilterDisabled({disable: false});
       await setFilters(tmpfilters);
       setClickFilter({isClick: true});
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
                            { name: "Балтика", value: 5 },
                            { name: "Гусь", value: 6 },
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
            onFilter={handleFilter}
            onReset={resetFilters}
        />
    );
};

export default BeerFilterTable;
