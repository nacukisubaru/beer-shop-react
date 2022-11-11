import { Box, Button, TextField } from "@mui/material";
import { FC, useState, useEffect } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

interface InputSelect {
    valueInputSelect: ValueInputSelect[];
    multiple?: boolean;
}
interface ValueInputSelect {
    id: number;
    name: string;
    value: string;
}

interface ValueInputRange {
    min: number;
    max: number;
    fieldMin: string;
    fieldMax: string;
}

interface ValueInputBoolean {
    trueValue: string;
    falseValue: string;
    trueName: string;
    falseName: string;
}

interface Field {
    value: string;
    name: string;
}

interface FilterItem {
    field: string;
    fieldName: string;
    inputSelect?: InputSelect;
    inputSelectBoolean?: ValueInputBoolean;
    inputText?: boolean;
    inputRange?: ValueInputRange;
    inputNumber?: boolean;
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
                                inputText,
                                inputSelect,
                                inputSelectBoolean,
                                inputNumber,
                                inputRange,
                            } = filter;
                            if (inputText) {
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
                                    return (
                                        <CustomSelect
                                            multiple={multiple}
                                            name={fieldName}
                                            list={valueInputSelect}
                                            defaultSelectedItem={
                                                valueInputSelect[0].value
                                            }
                                        />
                                    );
                                }
                            } else if (inputSelectBoolean) {
                                const {
                                    trueValue,
                                    falseValue,
                                    trueName,
                                    falseName,
                                } = inputSelectBoolean;
                                const listSelectBoolean = [
                                    { value: trueValue, name: trueName },
                                    { value: falseValue, name: falseName },
                                ];
                                return (
                                    <CustomSelect
                                        multiple={false}
                                        name={fieldName}
                                        list={listSelectBoolean}
                                        defaultSelectedItem={trueValue}
                                    />
                                );
                            } else if (inputNumber) {
                                return (
                                    <TextField
                                        id="outlined-number"
                                        label={fieldName}
                                        name={field}
                                        variant="standard"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                );
                            } else if (inputRange) {
                                return (
                                    <>
                                        <TextField
                                            id="outlined-number"
                                            label={fieldName}
                                            name={inputRange.fieldMin}
                                            type="number"
                                            variant="standard"
                                            InputProps={{
                                                inputProps: {
                                                    min: inputRange.min,
                                                    max: inputRange.max,
                                                },
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                        <TextField
                                            id="outlined-number"
                                            label={fieldName}
                                            name={inputRange.fieldMax}
                                            type="number"
                                            variant="standard"
                                            InputProps={{
                                                inputProps: {
                                                    min: inputRange.min,
                                                    max: inputRange.max,
                                                },
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </>
                                );
                            }
                        })}
                </div>
            </Box>
        </>
    );
};

export default FilterPanelGrid;
