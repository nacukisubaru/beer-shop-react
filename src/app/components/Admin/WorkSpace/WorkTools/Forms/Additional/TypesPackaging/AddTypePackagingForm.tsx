import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { useGetProductTypesQuery } from "../../../../../../../store/services/product-types/product-types.api";
import { IProductType } from "../../../../../../../store/services/product-types/types/productTypes.type";
import Form from "../../Form";

interface AddTypePackagingFormProps {
    productTypes: IProductType[];
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddTypePackagingForm: FC<AddTypePackagingFormProps> = ({ productTypes, submit }) => {
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
                        items: productTypes.map((item) => {
                            return { name: item.name, value: item.id };
                        }),
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

export default AddTypePackagingForm;
