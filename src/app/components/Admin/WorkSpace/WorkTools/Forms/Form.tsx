import { Autocomplete, Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IStateResponse } from "../../../../../hooks/useCatalog";
import CustomSelect from "../../../../CustomUI/CustomSelect/CustomSelect";

interface ISelectItem {
    name: string;
    value: any;
}

interface ISelect {
    multiple: boolean;
    items: ISelectItem[];
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
}

interface IForm {
    fields: IField[];
    hasUploadImage?: boolean;
    submit: (data: any, isObject?: boolean) => Promise<IStateResponse>;
}

const Form: FC<IForm> = ({ fields, hasUploadImage = false, submit }) => {
    const {
        register,
        handleSubmit,
        getFieldState,
        resetField,
        setError,
        clearErrors,
        getValues,
        formState: { errors },
        setValue,
    } = useForm();

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [selectorArray, setSelectorArray] = useState(new Map());
    const [noFileError, setNoFileError] = useState(false);

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "6px",
        height: "6px",
        color: "red",
    };

    const uploadImage = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const resetFields = (data: any) => {
        Object.keys(data).map((key) => {
            resetField(key);
        });
        setSelectorArray(new Map());
    };

    const checkFieldsExist = (data:any) => {
        let allFieldsExist = true;
        fields.map((field)=>{
            if(!data.includes(field.name)) {
                setError(field.name, {message: 'Поле обязательно к заполнению'} );
                allFieldsExist = false;
            } else {
                clearErrors(field.name)
            }
        });
        return allFieldsExist;
    }

    const handleSetSelectValue = (name: string, value: any) => {
        setSelectorArray(new Map(selectorArray.set(name, value)));
        setValue(name, value);
        clearErrors(name);
    };

    const handleCheckFieldsExist = () => {
        const values = getValues();
        console.log({values})
        checkFieldsExist(Object.keys(values));
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(async (data) => {
                    const fieldsKeys = Object.keys(data);
                    const allFieldsExist = checkFieldsExist(fieldsKeys);
                    if(allFieldsExist) {
                        if (hasUploadImage) {
                            if (selectedFile) {
                                setNoFileError(false);
                                const formData = new FormData();
                                formData.append("image", selectedFile);
                                Object.entries(data).map((value) => {
                                    const [key, val] = value;
                                    if (Array.isArray(val)) {
                                        val.map((value) => {
                                            formData.append(key + "[]", value);
                                        });
                                    } else {
                                        formData.append(key, val);
                                    }
                                });
                                
                                const result = await submit(formData);
                                if (result.status !== "rejected") {
                                    setSelectedFile(null);
                                    resetFields(data);
                                }
                            } else {
                                setNoFileError(true);
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
                            });

                            const result = await submit(data, true);
                            if (result.status !== "rejected") {
                                resetFields(data);
                            }
                        }
                    }
                })}
            >
                {fields.map((field) => {
                    const { name, label, type, selectProps, validationProps } =
                        field;
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
                      
                                component = (
                                    <>
                                        <Autocomplete
                                            multiple={selectProps.multiple}
                                            value={
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

                                                setSelectorArray(
                                                    new Map(
                                                        selectorArray.set(
                                                            name,
                                                            value
                                                        )
                                                    )
                                                );
                                                
                                                if(newValue) {
                                                    setValue(name, newValue);
                                                }
                                                clearErrors(name);
                                            }}
                                            style={{
                                                marginBottom: "20px",
                                            }}
                                        />

                                        <p style={styleError}>
                                            {fieldState.error?.message}
                                        </p>
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
                        <TextField onChange={uploadImage} type="file" />
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
