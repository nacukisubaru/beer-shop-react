import { FC } from "react";
import Form from "../Form";

interface AddBeerFormProps {
    submit: (body:any) => void;
}

const AddBeerForm: FC<AddBeerFormProps> = ({ submit }) => {
    return (
        <Form
            fields={[
                {
                    name: "title",
                    type: "text",
                    label: "Название",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "description",
                    type: "text",
                    label: "Описание",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
            ]}
            submit={submit}
        />
    );
};

export default AddBeerForm;
