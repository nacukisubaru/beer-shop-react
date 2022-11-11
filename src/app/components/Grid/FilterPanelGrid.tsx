import { Box, Button, Card, MenuItem, Select } from "@mui/material";
import { FC, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CustomSelect from "../CustomSelect/CustomSelect";

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
    value: string;
    name: string;
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
    const [selectedField, setSelectedField] = useState<string>("");
    const [isVisibleAddBtn, setVisibleAddBtn] = useState<boolean>(false);

    useEffect(() => {
        const fields = itemFilterList.map((item) => {
            const { field, fieldName } = item;
            return { value: field, name: fieldName };
        });
        setSelectedField(fields[0].value);
        setFieldsList(fields);
    }, []);

    const handleSetFilter = () => {
        setVisibleAddBtn(true);
    }

    const handleVisibleAddBtn = () => {
        setVisibleAddBtn(false);
    }

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
                {fieldsList && selectedField && (
                    <div>
                        {isVisibleAddBtn ? (
                            <Button variant="text" onClick={handleVisibleAddBtn}>+ Добавить фильтр</Button>
                        ) : (
                            <CustomSelect
                                list={fieldsList}
                                defaultSelectedItem={selectedField}
                                action={handleSetFilter}
                            ></CustomSelect>
                        )}
                    </div>
                )}
            </Box>
        </>
    );
};

export default FilterPanelGrid;
