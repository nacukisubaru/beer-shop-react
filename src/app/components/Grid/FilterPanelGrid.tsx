import { Box, Button, Card, MenuItem, Select, TextField } from "@mui/material";
import { FC, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CustomSelect from "../CustomSelect/CustomSelect";

interface InputSelect {
    valueInputSelect: ValueInputSelect[];
    multiple: boolean;
}
interface ValueInputSelect {
    id: number;
    name: string;
    value: string;
}

interface ValueInputRange {
    min: number;
    max: number;
}

interface ValueInputBoolean {
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
    inputSelect?: InputSelect;
    valueInputBoolean?: ValueInputBoolean;
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
    const [filterList, setFilter] = useState<FilterItem[]>([]);
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

    const handleSetFilter = (value: string) => {
        setVisibleAddBtn(true);
        const itemFilter: FilterItem | undefined = itemFilterList.find(
            (field) => field.field === value
        );

        const newFieldList: Field[] = fieldsList.filter(
            (field) => field.value !== value
        );
        if (itemFilter) {
            setFilter([...filterList, itemFilter]);
            setFieldsList(newFieldList);
        }
    };

    const handleVisibleAddBtn = () => {
        setVisibleAddBtn(false);
    };

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
                    {fieldsList.length && selectedField && (
                        <div>
                            {isVisibleAddBtn ? (
                                <Button
                                    variant="text"
                                    onClick={handleVisibleAddBtn}
                                >
                                    + Добавить фильтр
                                </Button>
                            ) : (
                                <CustomSelect
                                    list={fieldsList}
                                    defaultSelectedItem={selectedField}
                                    action={handleSetFilter}
                                />
                            )}
                        </div>
                    )}
                    {filterList.length &&
                        filterList.map((filter) => {
                            const {
                                field,
                                fieldName,
                                valueInput,
                                inputSelect,
                            } = filter;
                            if (valueInput) {
                                return (
                                    <TextField
                                        id="filled-basic"
                                        label={fieldName}
                                        variant="standard"
                                        name={field}
                                    />
                                );
                            } else if (inputSelect) {
                                const { valueInputSelect, multiple } =
                                    inputSelect;
                                if (valueInputSelect.length) {
                                    return <CustomSelect
                                        multiple={multiple}
                                        name={fieldName}
                                        list={valueInputSelect}
                                        defaultSelectedItem={
                                            valueInputSelect[0].value
                                        }
                                    />;
                                }
                            }
                        })}
                </div>
            </Box>
        </>
    );
};

export default FilterPanelGrid;
