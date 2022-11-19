import { Button, TextField } from "@mui/material";
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
    type: "text" | "number" | "select";
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
        setValue
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
                    fields.map((item: IField)=>{
                        if(item.type === "number") {
                            const fieldKey = Object.keys(data).find(key => key === item.name && item.type === "number");
                            if(fieldKey) {
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
                    switch (type) {
                        case "text":
                            return (
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
                        case "number":
                            return (
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
                        case "select":
                            if (selectProps) {
                                return (
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
                    }
                    return <></>;
                })}

                <Button type="submit">Добавить</Button>
            </form>
        </>
    );
};

export default Form;
