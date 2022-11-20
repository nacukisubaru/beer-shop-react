import { Autocomplete, Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    submit: (data: any, isObject?: boolean) => void;
}

const Form: FC<IForm> = ({ fields, hasUploadImage = false, submit }) => {
    const {
        register,
        handleSubmit,
        getFieldState,
        resetField,
        formState: { errors },
        setValue,
    } = useForm();

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [selectorArray, setSelectorArray] = useState(new Map());

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "6px",
        height: "6px",
        color: "red",
    };


    const uploadImage = (e:any) => {
        const formData = new FormData();
        formData.append('image',  e.target.files[0]);
        setSelectedFile(formData);
    }

    const handleSetSelectValue = (name:string, value:any) => {
        setSelectorArray(new Map(selectorArray.set(name, value)));
        setValue(name, value);
    }

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
                    if(hasUploadImage) {
                        if(selectedFile) {
                            Object.entries(data).map((value) => {
                                const [key, val] = value; 
                                if(Array.isArray(val)) {
                                    val.map((value) => {
                                        selectedFile.append(key+'[]', value);
                                    })
                                } else {
                                    selectedFile.append(key, val);
                                }
                            });
                            submit(selectedFile);
                            setSelectedFile(null);
                        }
                    } else {
                        fields.map((item: IField) => {
                            if (item.type === "number") {
                                const fieldKey = Object.keys(data).find(
                                    (key) =>
                                        key === item.name && item.type === "number"
                                );
                                if (fieldKey) {
                                    data[fieldKey] = Number(data[fieldKey]);
                                }
                            }
                        });
                        submit(data, true);
                    }

                    Object.keys(data).map((key) => {
                        resetField(key);
                    });
                    setSelectorArray(new Map());
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
                                                defaultSelectedItem={selectValues ? selectValues : ''}
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
                                component = <Autocomplete
                                    multiple={selectProps.multiple}
                                    value={selectValues ? selectValues : selectProps.multiple ? [] : {} }
                                    id="tags-outlined"
                                    options={selectProps.items}
                                    getOptionLabel={(option) => option.name ? option.name : ''}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={label}
                                            placeholder={label}
                                        />
                                    )}
                                    onChange={(e, value: any) => {
                                        let newValue = value;
                                        if(selectProps.multiple) {
                                            newValue = value.map((item:any) => item.value);
                                        } else {
                                            newValue = value.value;
                                        }

                                        setSelectorArray(new Map(selectorArray.set(name, value)));
                                        setValue(name, newValue);
                                    }}
                                    style={{
                                        marginBottom: "20px",
                                    }}
                                />;
                            }
                        break;
                        default:
                            component = <></>;
                        break;
                    }
                    return component;
                })}

                {hasUploadImage && (
                     <TextField onChange={uploadImage} type="file" />
                )}
                <div>
                <Button type="submit">Добавить</Button>
                </div>
            </form>
        </>
    );
};

export default Form;
