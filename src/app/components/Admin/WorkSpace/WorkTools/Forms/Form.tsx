import { Button, TextField } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface ISelectItem {
    name: string;
    value: any;
}

interface ISelect {
    multiple: boolean;
    item: ISelectItem;
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
}

const Form: FC<IForm> = ({ fields }) => {
    const {
        register,
        handleSubmit,
        getFieldState,
        formState: { errors },
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
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                {fields.map((field) => {
                    const { name, label, type, selectProps, validationProps } =
                        field;
                    switch (type) {
                        case "text":
                            const fieldState = getFieldState(name);
                            console.log({ fieldState });
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
                            break;
                        case "number":
                            break;
                        case "select":
                            break;
                    }
                    return <></>;
                })}

                <Button type="submit">Добавить</Button>
            </form>
        </>
    );
};

export default Form;
