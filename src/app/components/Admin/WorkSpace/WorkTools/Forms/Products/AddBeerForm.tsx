import { FC } from "react";
import Form from "../Form";

const AddBeerForm: FC = () => {
    return <Form fields={
        [
            { name: "title", type: "text", label: "Название", validationProps: { required: "Поле обязательно для заполнения" } },
            { name: "description", type: "text", label: "Описание", validationProps: { required: "Поле обязательно для заполнения" } }
        ]
    } />;
};

export default AddBeerForm;
