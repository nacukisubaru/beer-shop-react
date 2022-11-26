import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { useGetProductTypesQuery } from "../../../../../../../store/services/product-types/product-types.api";
import Form from "../../Form";

interface AddBrandFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddBrandForm: FC<AddBrandFormProps> = ({ submit }) => {
    const { closeModalAddContent } = useActions();
    const { data } = useGetProductTypesQuery({});

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
                        items: data
                            ? data.map((item) => {
                                  return { name: item.name, value: item.id };
                              })
                            : [],
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
