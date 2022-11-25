import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import Form from "../../Form";

interface AddBrandFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddBrandForm: FC<AddBrandFormProps> = ({ submit }) => {
    const { closeModalAddContent } = useActions();

    return (
        <Form
            fields={[
                {
                    name: "name",
                    type: "text",
                    label: "Название",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "productTypeId",
                    type: "selectAuto",
                    label: "Тип товара",
                    selectProps: {
                        multiple: false,
                        items:  [
                            { name: "Пиво", value: 1 },
                            { name: "Закуски", value: 2 },
                        ],
                    },
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
            ]}
            submit={submit}
            onCancel={closeModalAddContent}
        />
    );
};

export default AddBrandForm;
