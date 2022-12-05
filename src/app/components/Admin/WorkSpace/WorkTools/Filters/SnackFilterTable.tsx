import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { brandApi } from "../../../../../store/services/brands/brand.api";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const SnackFilterTable: FC = () => {
    const { setFilter, removeFilter, resetFilters, filter} = useActions();
    const { tmpfilters  } = useAppSelector(state => state.contentReducer);
    const brandsList = brandApi.useGetListByProductTypeQuery("snacks");

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
                { field: "title", fieldName: "Название", inputText: true },
                {
                    field: "description",
                    fieldName: "Описание",
                    inputText: true,
                },
                {
                    field: "brandIds",
                    fieldName: "Бренды",
                    inputSelect: {
                        valueInputSelect: brandsList && brandsList.data ? brandsList.data.map((brand) => {
                            return {
                                name: brand.name,
                                value: brand.id,
                            };
                        }) : [],
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
                {
                    field: "inStock",
                    fieldName: "В наличии",
                    inputSelectBoolean: {
                        trueName: "Да",
                        trueValue: "true",
                        falseName: "Нет",
                        falseValue: "false",
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

export default SnackFilterTable;
