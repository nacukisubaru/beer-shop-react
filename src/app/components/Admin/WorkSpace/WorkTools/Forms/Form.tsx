import { Autocomplete, Button, TextField } from "@mui/material";
import { FC, useState } from "react";
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
        getValues,
        formState: { errors },
        setValue,
    } = useForm();

    const [selectedFile, setSelectedFile] = useState<any>(null);
    //мысль записывать в состояние для селектов массив ключ имя слекта = значение массив объектов значений селекта
    //по имени селекта брать из состояния и устанавливать в value autocomplete
    //если форма отправилась и нужен сборс то сбрасывать все эти селекты по ключу имени селекта
    const [selectFields] = useState([]);

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

    console.log({values: getValues()})

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
                    if(hasUploadImage) {
                        if(selectedFile) {
                            Object.entries(data).map((value) => {
                                const [key, val] = value; 
                                if(Array.isArray(val)) {
                                    selectedFile.append(key+'[]', val);
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
                                                list={selectProps?.items}
                                                appearance="outlined"
                                                action={setValue}
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
                                component = <Autocomplete
                                    multiple={selectProps.multiple}
                                    //value={[{name:'Эльфийский эль', value: 10}]}
                                    id="tags-outlined"
                                    options={selectProps.items}
                                    getOptionLabel={(option) => option.name}
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
