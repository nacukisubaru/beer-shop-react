import { Autocomplete, Box, Button, Card, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IStateResponse } from "../../../../../hooks/useCatalog";
import CustomSelect from "../../../../CustomUI/CustomSelect/CustomSelect";

interface ISelectItem {
    name: any;
    value: any;
}

interface ICreateSelectData {
    name: string;
    link: string;
}

interface ISelect {
    multiple: boolean;
    items: ISelectItem[];
    defaultItems?: ISelectItem[];
    defaultValue?: any;
    defaultItem?: ISelectItem;
    createSelectData?: ICreateSelectData;
    onOpen?: () => void;
}

interface IValidation {
    required?: string;
}

interface IField {
    type: "text" | "number" | "select" | "selectAuto";
    name: string;
    label: string;
    validationProps: IValidation;
    selectProps?: ISelect;
    defaultValue?: string | number;
}

interface IForm {
    fields: IField[];
    hasUploadImage?: boolean;
    defaultFile?: string;
    updateId?: number;
    nameSubmitBtn?: string;
    submit: (data: any, isObject?: boolean) => Promise<IStateResponse>;
    onSubmit?: () => void;
    onCancel: () => void;
}

const Form: FC<IForm> = ({
    fields,
    hasUploadImage = false,
    updateId,
    defaultFile = "",
    nameSubmitBtn,
    submit,
    onSubmit,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        getFieldState,
        setError,
        clearErrors,
        getValues,
        formState: { errors },
        setValue,
    } = useForm();
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectorArray, setSelectorArray] = useState(new Map());
    const [selectorOptions, setSelectorOptions] = useState(new Map());
    const [noFileError, setNoFileError] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>(defaultFile);
    const [isChangingAutocomplete, setAutocompleteChange] = useState(false);
    const [isChangingAutocompleteMult, setAutocompleteChangeMult] = useState(false);
    const [isChangingSelect, setSelectChange] = useState(false);
    const [optionsIsLoaded, setOptionsLoaded] = useState(false);

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "6px",
        height: "6px",
        color: "red",
    };

    useEffect(() => {
        fields.map((field) => {
            if (field.type === "selectAuto" && field.selectProps) {
                const arrayOptions: any = [];
                const selectProps = field.selectProps;
                if (selectProps.items.length) {
                    selectProps.items.map((item) => {
                        const defaultItemsValues = selectProps.defaultItems
                            ? selectProps.defaultItems.map((item) => item.value)
                            : [];
                        if (!defaultItemsValues.includes(item.value)) {
                            arrayOptions.push(item);
                            setSelectorOptions(
                                new Map(
                                    selectorOptions.set(
                                        field.name,
                                        arrayOptions
                                    )
                                )
                            );
                        }
                        return item;
                    });
                }
            }
            return field;
        });
        setOptionsLoaded(true);
    }, []);

    const uploadImage = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = (e: any) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
            setNoFileError(false);
            e.target.value = null;
        }
    };

    const resetFields = (data: any) => {
        if (!updateId) {
            Object.keys(data).map((key) => {
                setValue(key, undefined);
                return key;
            });
            setSelectorArray(new Map());
            setSelectedImage("");
        }
    };

    const checkFieldsExist = (data: any) => {
        let allFieldsExist = true;
        const fieldsKeys = Object.keys(data);
        fields.map((field) => {
            if (!fieldsKeys.includes(field.name)) {
                setError(field.name, {
                    message: "Поле обязательно для заполнения",
                });
                allFieldsExist = false;
            }
            return field;
        });

        Object.entries(data).map((value) => {
            const [key, val] = value;
            if (
                val === "" ||
                val === undefined ||
                (Array.isArray(val) && !val.length)
            ) {
                setError(key, { message: "Поле обязательно для заполнения" });
            } else {
                clearErrors(key);
            }
            return value;
        });

        return allFieldsExist;
    };

    const handleSetSelectValue = (name: string, value: any) => {
        setSelectChange(true);
        setSelectorArray(new Map(selectorArray.set(name, value)));
        setValue(name, value);
        clearErrors(name);
    };

    const handleCheckFieldsExist = () => {
        const values = getValues();
        checkFieldsExist(values);
        if (hasUploadImage && !selectedFile && !defaultFile) {
            setNoFileError(true);
        } else {
            setNoFileError(false);
        }
    };

    const setAutoSelectValues = (selectProps: ISelect, name: string) => {
        if (selectProps.defaultItem && !isChangingAutocomplete) {
            setValue(name, selectProps.defaultItem.value);
        }

        if (selectProps.defaultItems && !isChangingAutocompleteMult) {
            setValue(
                name,
                selectProps.defaultItems.map((item) => item.value)
            );
        }
    };

    const createForm = (fieldsForm: any, selectedFile: File | null) => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append("image", selectedFile);
        }
        Object.entries(fieldsForm).map((value: any) => {
            const [key, val] = value;
            if (Array.isArray(val)) {
                val.map((value) => {
                    formData.append(key + "[]", value);
                    return value;
                });
            } else {
                formData.append(key, val);
            }
            return value;
        });

        if (updateId) {
            formData.append("id", String(updateId));
        }

        return formData;
    };

    const submitWithFile = async (fieldsForm: any) => {
        if (selectedFile || defaultFile) {
            setNoFileError(false);

            const formData = createForm(fieldsForm, selectedFile);
            const result = await submit(formData);
            if (result.status !== "rejected") {
                setSelectedFile(null);
                resetFields(fieldsForm);
            }
        } else {
            if (!defaultFile) {
                setNoFileError(true);
            }
        }
    };

    const submitWithoutFile = async (fieldsForm: any) => {
        fields.map((item: IField) => {
            if (item.type === "number") {
                const fieldKey = Object.keys(fieldsForm).find(
                    (key) => key === item.name && item.type === "number"
                );
                if (fieldKey) {
                    fieldsForm[fieldKey] = Number(fieldsForm[fieldKey]);
                }
            }
            return item;
        });

        if (updateId) {
            fieldsForm.id = updateId;
        }

        const result = await submit(fieldsForm, true);
        if (result.status !== "rejected") {
            resetFields(fieldsForm);
        }
    };

    const submitForm = async (data: any) => {
        const allFieldsExist = checkFieldsExist(data);
        if (allFieldsExist) {
            if (hasUploadImage) {
                await submitWithFile(data);
            } else {
                await submitWithoutFile(data);
            }
        }
        onSubmit && onSubmit();
    };

    const autocompleteChange = (
        value: ISelectItem[] | ISelectItem,
        name: string,
        selectProps: ISelect
    ) => {
        console.log({ value });
        let newValue: any;
        if (Array.isArray(value)) {
            newValue = value.map((item: any) => item.value);
        } else {
            newValue = value?.value;
        }

        if (selectProps.multiple) {
            setAutocompleteChangeMult(true);
        } else {
            setAutocompleteChange(true);
        }

        let values: any;
        if (Array.isArray(newValue)) {
            values = newValue;
        } else {
            values = [newValue];
        }

        const arrayOptions: ISelectItem[] = [];
        selectProps.items.map((item: ISelectItem) => {
            if (!values.includes(item.value)) {
                arrayOptions.push(item);
            }
            return item;
        });

        setSelectorOptions(selectorOptions.set(name, arrayOptions));
        setSelectorArray(new Map(selectorArray.set(name, value)));
        setValue(name, newValue);

        if ((Array.isArray(newValue) && !newValue.length) || !newValue) {
            setError(name, {
                message: "Поле обязательно для заполнения",
            });
        } else {
            clearErrors(name);
        }
    };

    return (
        <>
            {optionsIsLoaded && (
                <>
                    <form onSubmit={handleSubmit(submitForm)}>
                        {fields.map((field) => {
                            const {
                                name,
                                label,
                                type,
                                selectProps,
                                validationProps,
                                defaultValue,
                            } = field;
                            const fieldState = getFieldState(name);
                            let component: any;
                            switch (type) {
                                case "text":
                                    component = (
                                        <>
                                            <div
                                                style={{
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <TextField
                                                    id="text-field"
                                                    variant="outlined"
                                                    label={label}
                                                    defaultValue={
                                                        defaultValue
                                                            ? defaultValue
                                                            : ""
                                                    }
                                                    error={fieldState.invalid}
                                                    {...register(
                                                        name,
                                                        validationProps
                                                    )}
                                                    fullWidth
                                                />
                                                <p style={styleError}>
                                                    {fieldState.error?.message}
                                                </p>
                                            </div>
                                        </>
                                    );
                                    break;
                                case "number":
                                    component = (
                                        <>
                                            <div
                                                style={{
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <TextField
                                                    id="text-field"
                                                    variant="outlined"
                                                    label={label}
                                                    defaultValue={
                                                        defaultValue
                                                            ? defaultValue
                                                            : ""
                                                    }
                                                    error={fieldState.invalid}
                                                    {...register(
                                                        name,
                                                        validationProps
                                                    )}
                                                    type="number"
                                                    fullWidth
                                                />
                                                <p style={styleError}>
                                                    {fieldState.error?.message}
                                                </p>
                                            </div>
                                        </>
                                    );
                                    break;
                                case "select":
                                    const selectValues =
                                        selectorArray.get(name);
                                    if (selectProps) {
                                        !isChangingSelect &&
                                            selectProps.defaultValue &&
                                            setValue(
                                                name,
                                                selectProps.defaultValue
                                            );
                                        component = (
                                            <>
                                                <div
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    { selectProps.items.length ? (
                                                        <CustomSelect
                                                            multiple={
                                                                selectProps?.multiple
                                                            }
                                                            name={label}
                                                            id={name}
                                                            defaultSelectedItem={
                                                                selectProps.defaultValue
                                                                    ? selectProps.defaultValue
                                                                    : selectValues
                                                                    ? selectValues
                                                                    : ""
                                                            }
                                                            list={
                                                                selectProps?.items
                                                            }
                                                            appearance="outlined"
                                                            action={
                                                                handleSetSelectValue
                                                            }
                                                        />
                                                    ) : (
                                                        <>  
                                                            {selectProps.createSelectData && (
                                                                <Button onClick={()=>{ selectProps.createSelectData && router.replace(selectProps.createSelectData.link)}}>
                                                                    {selectProps.createSelectData.name}
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                    
                                                    <p style={styleError}>
                                                        {
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    }
                                    break;
                                case "selectAuto":
                                    if (selectProps) {
                                        console.log({selectProps})
                                        const selectValues =
                                            selectorArray.get(name);
                                        const selectOptions =
                                            selectorOptions.get(name);
                                        setAutoSelectValues(selectProps, name);
                                        component = (
                                            <>
                                                <div
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    {selectOptions ? (
                                                        <Autocomplete
                                                            multiple={
                                                                selectProps.multiple
                                                            }
                                                            value={
                                                                !isChangingAutocomplete &&
                                                                selectProps.defaultItem
                                                                    ? selectProps.defaultItem
                                                                    : !isChangingAutocompleteMult &&
                                                                      selectProps.defaultItems
                                                                    ? selectProps.defaultItems
                                                                    : selectValues
                                                                    ? selectValues
                                                                    : selectProps.multiple
                                                                    ? []
                                                                    : {}
                                                            }
                                                            id="tags-outlined"
                                                            options={
                                                                selectOptions
                                                            }
                                                            getOptionLabel={(
                                                                option
                                                            ) =>
                                                                option.name
                                                                    ? option.name
                                                                    : ""
                                                            }
                                                            filterSelectedOptions
                                                            renderInput={(
                                                                params
                                                            ) => (
                                                                <TextField
                                                                    {...params}
                                                                    label={
                                                                        label
                                                                    }
                                                                    placeholder={
                                                                        label
                                                                    }
                                                                />
                                                            )}
                                                            freeSolo={true}
                                                            onChange={(
                                                                e,
                                                                value: any
                                                            ) => {
                                                                autocompleteChange(
                                                                    value,
                                                                    name,
                                                                    selectProps
                                                                );
                                                            }}
                                                            onOpen={
                                                                selectProps.onOpen
                                                                    ? selectProps.onOpen
                                                                    : () => {}
                                                            }
                                                        />
                                                    ) : (
                                                        <>  
                                                            {selectProps.createSelectData && (
                                                                <Button onClick={()=>{ selectProps.createSelectData && router.replace(selectProps.createSelectData.link)}}>
                                                                    {selectProps.createSelectData.name}
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}

                                                    <p style={styleError}>
                                                        {
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    }
                                    break;
                                default:
                                    component = <></>;
                                    break;
                            }
                            return component;
                        })}

                        {hasUploadImage && (
                            <>
                                <TextField
                                    onChange={uploadImage}
                                    type="file"
                                    sx={{ marginBottom: "10px" }}
                                    fullWidth
                                />
                                {selectedImage && (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "9px",
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                width: 300,
                                                height: "auto",
                                                boxShadow: "none",
                                            }}
                                        >
                                            <Box
                                                className="card-img"
                                                style={{
                                                    backgroundSize: "contain",
                                                }}
                                                sx={{
                                                    background: `url(${selectedImage}) center center no-repeat`,
                                                }}
                                            ></Box>
                                        </Card>
                                    </div>
                                )}
                                {noFileError && (
                                    <p style={styleError}>
                                        Фото для товара не загружено
                                    </p>
                                )}
                            </>
                        )}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button variant="outlined" onClick={onCancel}>
                                Отменить
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={handleCheckFieldsExist}
                            >
                                {nameSubmitBtn ? nameSubmitBtn : "Добавить"}
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default Form;
