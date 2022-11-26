import { Box, Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { FC, useState, useEffect } from "react";
import CustomSelect from "../CustomUI/CustomSelect/CustomSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface InputSelect {
    valueInputSelect: ValueInputSelect[];
    multiple?: boolean;
}
interface ValueInputSelect {
    name: string;
    value: number | string | number[] | string[];
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
    setCustomFilter?: (
        name: string,
        value: number | string | number[] | string[]
    ) => void;
    removeCustomFilter?: (name: string) => void;
    onFilter?: () => void;
    onReset?: () => void;
}

const FilterPanelGrid: FC<FilterPanelGridProps> = ({
    itemFilterList,
    filters = [],
    width,
    setCustomFilter,
    removeCustomFilter,
    onFilter,
    onReset,
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
            .filter(
                (item) =>
                    !filters.map((filter) => filter.name).includes(item.value)
            )
    );
    const [oldFieldsList] = useState<Field[]>(fieldsList);
    const [filterList, setFilter] = useState<FilterItem[]>(
        itemFilterList.filter((item) =>
            filters.map((filter) => filter.name).includes(item.field)
        )
    );
    const [selectedField, setSelectedField] = useState<string>(
        itemFilterList[0].field
    );
    const [isVisibleAddBtn, setVisibleAddBtn] = useState<boolean>(true);

    useEffect(() => {
        if (!filters.length) {
            setFilter([]);
        }
    }, [filters]);

    const handleSetFilter = (name: string, value: string) => {
        setVisibleAddBtn(true);
        const itemFilter: FilterItem | undefined = itemFilterList.find(
            (field) => field.field === value
        );

        const newFieldList: Field[] = fieldsList.filter(
            (field) => field.value !== value
        );
    
        if (itemFilter) {
            setFilter([...filterList, itemFilter]);
        }

        if(newFieldList.length) {
            setFieldsList(
                newFieldList.sort((a, b) => {
                    return a.name.charCodeAt(0) - b.name.charCodeAt(0);
                })
            );
            setSelectedField(newFieldList[0].value);
        } else {
            setFieldsList([]);
        }

        setCustomFilter && setCustomFilter(value, "");
    };

    const handleVisibleAddBtn = () => {
        setVisibleAddBtn(false);
    };

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
            removeCustomFilter && removeCustomFilter(itemFilter.field);
        }

        setFilter(newFilterList);
    };

    const setFilterValueSelect = (name: string, value: string) => {
        console.log({ value, name });
        if (setCustomFilter) {
            setCustomFilter(name, value);
        }
    };

    const setFilterValueText = (e: any) => {
        const { name, value } = e.target;
        if (setCustomFilter) {
            setCustomFilter(name, value);
        }
    };

    const reset = () => {
        onReset && onReset();
        setFieldsList(
            oldFieldsList.sort((a, b) => {
                return a.name.charCodeAt(0) - b.name.charCodeAt(0);
            })
        );
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

                            let findFilter: any;
                            if (filters.length) {
                                findFilter = filters.find(
                                    (filter) => filter.name === field
                                );
                            }
                            if (inputText) {
                                return (
                                    <div
                                        style={{ display: "flex" }}
                                        key={field}
                                    >
                                        <TextField
                                            id="filled-basic"
                                            label={fieldName}
                                            variant="standard"
                                            name={field}
                                            onBlur={setFilterValueText}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            defaultValue={
                                                findFilter && findFilter.value
                                                    ? findFilter.value
                                                    : ""
                                            }
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
                                        <div
                                            style={{ display: "flex" }}
                                            key={field}
                                        >
                                            <CustomSelect
                                                multiple={multiple}
                                                name={fieldName}
                                                list={valueInputSelect}
                                                defaultSelectedItem={
                                                    findFilter &&
                                                    findFilter.value
                                                        ? findFilter.value
                                                        : valueInputSelect[0]
                                                              .value
                                                }
                                                defaultSelectedItemsMult={
                                                    findFilter &&
                                                    findFilter.value
                                                        ? findFilter.value
                                                        : []
                                                }
                                                id={field}
                                                action={setFilterValueSelect}
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
                                    <div
                                        style={{ display: "flex" }}
                                        key={field}
                                    >
                                        <CustomSelect
                                            multiple={false}
                                            name={fieldName}
                                            list={listSelectBoolean}
                                            defaultSelectedItem={
                                                findFilter && findFilter.value
                                                    ? findFilter.value
                                                    : trueValue
                                            }
                                            id={field}
                                            sx={{ marginBottom: "20px" }}
                                            action={setFilterValueSelect}
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
                                    <div
                                        style={{ display: "flex" }}
                                        key={field}
                                    >
                                        <TextField
                                            id="outlined-number"
                                            label={fieldName}
                                            name={field}
                                            variant="standard"
                                            type="number"
                                            onBlur={setFilterValueText}
                                            defaultValue={
                                                findFilter && findFilter.value
                                                    ? findFilter.value
                                                    : ""
                                            }
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
                                let findFilterMin: any;
                                let findFilterMax: any;
                                if (filters.length) {
                                    findFilterMin = filters.find(
                                        (filter) =>
                                            filter.name === inputRange.fieldMin
                                    );
                                    findFilterMax = filters.find(
                                        (filter) =>
                                            filter.name === inputRange.fieldMax
                                    );
                                }
                                return (
                                    <div
                                        style={{ display: "flex" }}
                                        key={field}
                                    >
                                        <TextField
                                            id="outlined-number"
                                            label={inputRange.nameMin}
                                            name={inputRange.fieldMin}
                                            type="number"
                                            variant="standard"
                                            onBlur={setFilterValueText}
                                            defaultValue={
                                                findFilterMin &&
                                                findFilterMin.value
                                                    ? findFilterMin.value
                                                    : ""
                                            }
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
                                            onBlur={setFilterValueText}
                                            defaultValue={
                                                findFilterMax &&
                                                findFilterMax.value
                                                    ? findFilterMax.value
                                                    : ""
                                            }
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
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={reset}
                            >
                                Сбросить
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    onFilter && onFilter();
                                }}
                            >
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
