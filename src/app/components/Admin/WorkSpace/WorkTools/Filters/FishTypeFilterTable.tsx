import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const FishTypeFilterTable: FC = () => {
    const { setFilter, removeFilter, resetFilters, filter } = useActions();
    const { tmpfilters } = useAppSelector((state) => state.contentReducer);

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

export default FishTypeFilterTable;
