import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useGetProductTypesQuery } from "../../../../../store/services/product-types/product-types.api";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const BrandFilterTable: FC = () => {
    const { setFilter, removeFilter, resetFilters, filter } = useActions();
    const { tmpfilters } = useAppSelector((state) => state.contentReducer);
    const { data } = useGetProductTypesQuery({});
    const handleSetFilter = (
        name: string,
        value: number | string | number[] | string[]
    ) => {
        setFilter({ name, value });
    };

    const handleRemoveFilter = (name: string) => {
        removeFilter({ name });
    };

    return (
        <FilterPanelGrid
            itemFilterList={[
                { field: "id", fieldName: "ID", inputNumber: true },
                { field: "name", fieldName: "Название", inputText: true },
                {
                    field: "productTypeId",
                    fieldName: "Тип товара",
                    inputSelect: {
                        valueInputSelect: data
                            ? data.map((item) => {
                                  return { name: item.name, value: item.id };
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

export default BrandFilterTable;
