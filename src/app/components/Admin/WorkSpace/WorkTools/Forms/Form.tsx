import { Autocomplete, Button, TextField } from "@mui/material";
import { FC } from "react";
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
    submit: (data: any) => void;
}

const Form: FC<IForm> = ({ fields, submit }) => {
    const {
        register,
        handleSubmit,
        getFieldState,
        formState: { errors },
        setValue,
    } = useForm();

    const styleError = {
        display: "flex",
        justifyContent: "left",
        marginTop: "6px",
        height: "6px",
        color: "red",
    };

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
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
                    submit(data);
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

                <Button type="submit">Добавить</Button>
            </form>
        </>
    );
};

export default Form;
