import { Box, Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { FC, useState, useEffect, useCallback, useMemo } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

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
    nameMin: string;
    nameMax: string;
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

interface Filter {
    name: string;
    value: number | string | number[] | string[];
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
    filters?: Filter[];
    width: number;
    setFilterForRequest?: (
        name: string,
        value: number | string | number[] | string[]
    ) => void;
    onFilter?: () => void;
}

const FilterPanelGrid: FC<FilterPanelGridProps> = ({
    itemFilterList,
    filters,
    width,
    setFilterForRequest,
    onFilter,
}) => {
    const [fieldsList, setFieldsList] = useState<Field[]>(
        itemFilterList
            .map((item) => {
                const { field, fieldName } = item;
                return { value: field, name: fieldName };
            })
            .sort((a, b) => {
                return a.name.charCodeAt(0) - b.name.charCodeAt(0);
            })
    );
    const [filterList, setFilter] = useState<FilterItem[]>([]);
    const [selectedField, setSelectedField] = useState<string>(
        itemFilterList[0].field
    );
    const [isVisibleAddBtn, setVisibleAddBtn] = useState<boolean>(true);

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
            setFieldsList(
                newFieldList.sort((a, b) => {
                    return a.name.charCodeAt(0) - b.name.charCodeAt(0);
                })
            );
            setSelectedField(newFieldList[0].value);
        }
        setFilterForRequest && setFilterForRequest(value, '');
    };

    const handleVisibleAddBtn = () => {
        setVisibleAddBtn(false);
    };

    useEffect(() => {
        console.log({ fieldsList });
    }, [fieldsList]);

    const removeFilter = (value: string) => {
        const newFilterList: FilterItem[] = filterList.filter(
            (field) => field.field !== value
        );

        const itemFilter: FilterItem | undefined = itemFilterList.find(
            (field) => field.field === value
        );
        if (itemFilter) {
            setFieldsList(
                [
                    { value: itemFilter.field, name: itemFilter.fieldName },
                    ...fieldsList,
                ].sort((a, b) => {
                    return a.name.charCodeAt(0) - b.name.charCodeAt(0);
                })
            );
            setSelectedField(itemFilter.field);
        }

        setFilter(newFilterList);
    };

    return (
        <>
            <Box
                sx={{
                    width,
                    margin: "10px",
                    borderRadius: "15px",
                    overflowY: "scroll",
                }}
            >
                <Container maxWidth="sm">
                    {fieldsList.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {isVisibleAddBtn ? (
                                <Button
                                    variant="text"
                                    onClick={handleVisibleAddBtn}
                                    sx={{ marginBottom: "20px" }}
                                >
                                    + Добавить фильтр
                                </Button>
                            ) : (
                                <CustomSelect
                                    list={fieldsList}
                                    defaultSelectedItem={selectedField}
                                    action={handleSetFilter}
                                    name="Фильтры"
                                    sx={{ marginBottom: "20px" }}
                                />
                            )}
                        </div>
                    )}
                    {filterList.length > 0 &&
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
                                    <div style={{ display: "flex" }}>
                                        <TextField
                                            id="filled-basic"
                                            label={fieldName}
                                            variant="standard"
                                            name={field}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{
                                                marginBottom: "20px",
                                                width: "200px",
                                            }}
                                        />
                                        <IconButton
                                            sx={{
                                                height: "35px",
                                                width: "36px",
                                                marginTop: "8px",
                                            }}
                                            onClick={() => {
                                                removeFilter(field);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                );
                            } else if (inputSelect) {
                                const { valueInputSelect, multiple } =
                                    inputSelect;
                                if (valueInputSelect.length) {
                                    return (
                                        <div style={{ display: "flex" }}>
                                            <CustomSelect
                                                multiple={multiple}
                                                name={fieldName}
                                                list={valueInputSelect}
                                                defaultSelectedItem={
                                                    valueInputSelect[0].value
                                                }
                                                sx={{
                                                    minWidth: 120,
                                                    maxWidth: 300,
                                                    marginBottom: "20px",
                                                }}
                                            />
                                            <IconButton
                                                sx={{
                                                    height: "35px",
                                                    width: "36px",
                                                    marginTop: "40px",
                                                }}
                                                onClick={() => {
                                                    removeFilter(field);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
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
                                    <div style={{ display: "flex" }}>
                                        <CustomSelect
                                            multiple={false}
                                            name={fieldName}
                                            list={listSelectBoolean}
                                            defaultSelectedItem={trueValue}
                                            sx={{ marginBottom: "20px" }}
                                        />
                                        <IconButton
                                            sx={{
                                                height: "35px",
                                                width: "36px",
                                                marginTop: "8px",
                                            }}
                                            onClick={() => {
                                                removeFilter(field);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                );
                            } else if (inputNumber) {
                                return (
                                    <div style={{ display: "flex" }}>
                                        <TextField
                                            id="outlined-number"
                                            label={fieldName}
                                            name={field}
                                            variant="standard"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ marginBottom: "20px" }}
                                            fullWidth
                                        />
                                        <IconButton
                                            sx={{
                                                height: "35px",
                                                width: "36px",
                                                marginTop: "8px",
                                            }}
                                            onClick={() => {
                                                removeFilter(field);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                );
                            } else if (inputRange) {
                                return (
                                    <div style={{ display: "flex" }}>
                                        <TextField
                                            id="outlined-number"
                                            label={inputRange.nameMin}
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
                                            sx={{
                                                marginBottom: "20px",
                                                width: "80px",
                                                marginRight: "25px",
                                            }}
                                        />

                                        <TextField
                                            id="outlined-number"
                                            label={inputRange.nameMax}
                                            name={inputRange.fieldMax}
                                            type="number"
                                            variant="standard"
                                            InputProps={{
                                                inputProps: {
                                                    min: inputRange.min,
                                                    max: inputRange.max,
                                                },
                                            }}
                                            sx={{
                                                marginBottom: "20px",
                                                width: "80px",
                                                marginRight: "13px",
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                        <IconButton
                                            sx={{
                                                height: "35px",
                                                width: "36px",
                                                marginTop: "8px",
                                            }}
                                            onClick={() => {
                                                removeFilter(field);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                );
                            }
                        })}

                    {filterList.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <Button variant="outlined" size="small">
                                Сбросить
                            </Button>
                            <Button variant="contained" size="small">
                                Фильтровать
                            </Button>
                        </div>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default FilterPanelGrid;
