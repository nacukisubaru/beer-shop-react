import { FC } from "react";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const BeerFilterTable: FC = () => {
    return (
        <FilterPanelGrid
            itemFilterList={[
                { field: "title", fieldName: "Название", valueInput: true },
                {
                    field: "description",
                    fieldName: "Описание",
                    valueInput: true,
                },
                {
                    field: "price",
                    fieldName: "Цена",
                    valueInputRange: { min: 1000, max: 2000 },
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
            ]}
            height={390}
            width={300}
            onFilter={() => {}}
        />
    );
};

export default BeerFilterTable;
