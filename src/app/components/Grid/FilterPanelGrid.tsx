import { Box, Card, MenuItem, Select } from "@mui/material";
import { FC, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface Selector {
    id: number;
    name: string;
    multiply: boolean;
}

interface ValueInputRange {
    min: number;
    max: number;
}

interface valueInputBoolean {
    trueValue: string;
    falseValue: string;
}

interface Field {
    field: string;
    fieldName: string;
}

interface FilterItem {
    field: string;
    fieldName: string;
    valueInputSelector?: Selector[];
    valueInputBoolean?: valueInputBoolean;
    valueInput?: boolean;
    valueInputRange?: ValueInputRange;
    valueInputNumber?: boolean;
}

interface FilterPanelGridProps {
    itemFilterList: FilterItem[];
    height: number;
    width: number;
    onFilter?: () => void;
}

const FilterPanelGrid: FC<FilterPanelGridProps> = ({
    itemFilterList,
    height,
    width,
    onFilter,
}) => {
    const [fieldsList, setFieldsList] = useState<Field[]>([]);
    const [selectedField, setSelectedField] = useState("");

    useEffect(() => {
        const fields = itemFilterList.map((item) => {
            const { field, fieldName } = item;
            return { field, fieldName };
        });
        setSelectedField(fields[0].field);
        setFieldsList(fields);
    }, []);

    return (
        <>
            <Box
                sx={{
                    width,
                    height,
                    margin: "10px",
                    borderRadius: "15px",
                    paddingTop: "36px",
                }}
            >
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Поля
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="select-choice-field"
                            value={selectedField}
                            label="Поля"
                            onChange={() => {}}
                        >
                            {fieldsList.map((item) => {
                                return (
                                    <MenuItem
                                        onClick={() => {
                                            setSelectedField(item.field);
                                        }}
                                        value={item.field}
                                    >
                                        {item.fieldName}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
            </Box>
        </>
    );
};

export default FilterPanelGrid;
