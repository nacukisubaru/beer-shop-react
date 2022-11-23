import { Autocomplete, Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { IStateResponse } from "../../../../../hooks/useCatalog";
import CustomSelect from "../../../../CustomUI/CustomSelect/CustomSelect";

interface ISelectItem {
    name: any;
    value: any;
}

interface ISelect {
    multiple: boolean;
    items: ISelectItem[];
    defaultItems?: ISelectItem[];
    defaultValue?: any,
    defaultItem?: ISelectItem
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
    defaultValue?: string | number
}

interface IForm {
    fields: IField[];
    hasUploadImage?: boolean;
    defaultFile?: string;
    updateId?: number;
    submit: (data: any, isObject?: boolean) => Promise<IStateResponse>;
    onSubmit?: () => void;
}

const Form: FC<IForm> = ({ fields, hasUploadImage = false, updateId, defaultFile = "", submit, onSubmit }) => {
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

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [selectorArray, setSelectorArray] = useState(new Map());
    const [noFileError, setNoFileError] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>(defaultFile);
    const [isChangingAutocomplete, setAutocompleteChange] = useState(false);
    const [isChangingAutocompleteMult, setAutocompleteChangeMult] = useState(false);
    const [isChangingSelect, setSelectChange] = useState(false);

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "6px",
        height: "6px",
        color: "red",
    };

    const uploadImage = (e: any) => {
        const file = e.target.files[0];
        if(file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = (e:any) => {
                setSelectedImage(e.target.result);
            }
            reader.readAsDataURL(file);
            setNoFileError(false);
            e.target.value = null;
        }
    };

    const resetFields = (data: any) => {
        if(!updateId) {
            Object.keys(data).map((key) => {
                setValue(key, undefined);
                return key;
            });
            setSelectorArray(new Map());
            setSelectedImage("");
        }
    };

    const checkFieldsExist = (data:any) => {
        let allFieldsExist = true;
        const fieldsKeys = Object.keys(data);
        fields.map((field)=>{
            if(!fieldsKeys.includes(field.name)) {
                setError(field.name, {message: 'Поле обязательно для заполнения'});
                allFieldsExist = false;
            }
            return field;
        });

        Object.entries(data).map((value) => {
            const [key, val] = value;
            if(val === '' || val === undefined || (Array.isArray(val) && !val.length)) {
                setError(key, {message: 'Поле обязательно для заполнения'});
            } else {
                clearErrors(key);
            }
            return value;
        });

        return allFieldsExist;
    }

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
    }

    const setAutoSelectValues = (selectProps:ISelect, name: string) => {
        if(selectProps.defaultItem && !isChangingAutocomplete) {
            setValue(name, selectProps.defaultItem.value);
        }

        if(selectProps.defaultItems && !isChangingAutocompleteMult) {
            setValue(name, selectProps.defaultItems.map((item) => item.value)); 
        }
    };

    
    return (
        <>
            <form
                onSubmit={handleSubmit(async (data) => {
                    const allFieldsExist = checkFieldsExist(data);
                    if(allFieldsExist) {
                        if (hasUploadImage) {
                            if (selectedFile || defaultFile) {
                                setNoFileError(false);
                                const formData = new FormData();
                                formData.append("image", selectedFile);
                                Object.entries(data).map((value) => {
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

                                if(updateId) {
                                    formData.append('id', String(updateId));
                                }
                                
                                const result = await submit(formData);
                                if (result.status !== "rejected") {
                                    setSelectedFile(null);
                                    resetFields(data);
                                }
                            } else {
                                if(!defaultFile) {
                                    setNoFileError(true);
                                }
                            }
                        } else {
                            fields.map((item: IField) => {
                                if (item.type === "number") {
                                    const fieldKey = Object.keys(data).find(
                                        (key) =>
                                            key === item.name &&
                                            item.type === "number"
                                    );
                                    if (fieldKey) {
                                        data[fieldKey] = Number(data[fieldKey]);
                                    }
                                }
                                return item;
                            });

                            if(updateId) {
                                data.id = updateId;
                            }

                            const result = await submit(data, true);
                            if (result.status !== "rejected") {
                                resetFields(data);
                            }
                        }
                    }
                    onSubmit && onSubmit();
                })}
            >
                {fields.map((field) => {
                    const { name, label, type, selectProps, validationProps, defaultValue } = field;
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
                                            defaultValue={defaultValue ? defaultValue : ''}
                                            error={fieldState.invalid}
                                            {...register(name, validationProps)}
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
                                            defaultValue={defaultValue ? defaultValue : ''}
                                            error={fieldState.invalid}
                                            {...register(name, validationProps)}
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
                            const selectValues = selectorArray.get(name);
                            if (selectProps) {
                                !isChangingSelect && selectProps.defaultValue && setValue(name, selectProps.defaultValue);
                                component = (
                                    <>
                                        <div
                                            style={{
                                                marginBottom: "20px",
                                            }}
                                        >
                                            <CustomSelect
                                                multiple={selectProps?.multiple}
                                                name={label}
                                                id={name}
                                                defaultSelectedItem={
                                                    selectProps.defaultValue ? selectProps.defaultValue :
                                                    selectValues
                                                        ? selectValues
                                                        : ""
                                                }
                                                list={selectProps?.items}
                                                appearance="outlined"
                                                action={handleSetSelectValue}
                                            />
                                            <p style={styleError}>
                                                {fieldState.error?.message}
                                            </p>
                                        </div>
                                    </>
                                );
                            }
                            break;
                        case "selectAuto":
                            if (selectProps) {
                                const selectValues = selectorArray.get(name);
                                setAutoSelectValues(selectProps, name);

                                component = (
                                    <>
                                        <div
                                            style={{
                                                marginBottom: "20px",
                                            }}
                                        >
                                            <Autocomplete
                                                multiple={selectProps.multiple}
                                                value={

                                                    !isChangingAutocomplete && selectProps.defaultItem ?  selectProps.defaultItem :
                                                    !isChangingAutocompleteMult && selectProps.defaultItems ? selectProps.defaultItems :
                                                    selectValues
                                                        ? selectValues
                                                        : selectProps.multiple
                                                        ? []
                                                        : {}
                                                }
                                                id="tags-outlined"
                                                options={selectProps.items}
                                                getOptionLabel={(option) =>
                                                    option.name ? option.name : ""
                                                }
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={label}
                                                        placeholder={label}
                                                    />
                                                )}
                                                onChange={(e, value: any) => {
                                                    let newValue: any;
                                                    if (selectProps.multiple) {
                                                        newValue = value.map(
                                                            (item: any) => item.value
                                                        );
                                                    } else {
                                                        newValue = value?.value;
                                                    }

                                                    if(selectProps.multiple) {
                                                        setAutocompleteChangeMult(true);
                                                    } else {
                                                        setAutocompleteChange(true);
                                                    }

                                                    setSelectorArray(
                                                        new Map(
                                                            selectorArray.set(
                                                                name,
                                                                value
                                                            )
                                                        )
                                                    );

                                                    setValue(name, newValue);
                                                    if((Array.isArray(newValue) && !newValue.length) || (!newValue)) {
                                                        setError(name, {message: 'Поле обязательно для заполнения'});
                                                    } else {
                                                        clearErrors(name);
                                                    }
                                                }}
                                            />

                                            <p style={styleError}>
                                                {fieldState.error?.message}
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
                        <TextField onChange={uploadImage} type="file" fullWidth/>
                        {selectedImage && (
                             <div style={{display: 'flex', justifyContent: 'center', marginTop: '9px'}}>
                                  <img src={selectedImage} style={{width: 177, height: 208}} />
                             </div>
                        )}
                        {noFileError && (
                            <p style={styleError}>
                                Фото для товара не загружено
                            </p>
                        )}
                    </>
                )}
                <div>
                    <Button type="submit" onClick={handleCheckFieldsExist} >Добавить</Button>
                </div>
            </form>
        </>
    );
};

export default Form;
