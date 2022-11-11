import { FC } from "react";
import FilterPanelGrid from "../../../../Grid/FilterPanelGrid";

const BeerFilterTable: FC = () => {
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
                    inputRange: { min: 1000, max: 2000, fieldMin: "minPrice", fieldMax: "maxPrice" },
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
            height={390}
            width={300}
            onFilter={() => {}}
        />
    );
};

export default BeerFilterTable;
