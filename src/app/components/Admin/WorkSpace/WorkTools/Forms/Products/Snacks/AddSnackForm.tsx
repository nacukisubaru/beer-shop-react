import { FC, useEffect } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../../../store/services/brands/brand.api";
import { typePackagingApi } from "../../../../../../../store/services/type-packaging/type-packaging.api";
import Form from "../../Form";

interface AddSnackFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddSnackForm: FC<AddSnackFormProps> = ({ submit }) => {
    const brandsList = brandApi.useGetListByProductTypeQuery("snacks");
    const packagingList = typePackagingApi.useGetListByProductTypeQuery("snacks");
    const { closeModalAddContent } = useActions();

    useEffect(() => {
        brandsList.refetch();
        packagingList.refetch();
    }, []);

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
                {
                    name: "compound",
                    type: "text",
                    label: "Состав",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "quantity",
                    type: "number",
                    label: "Количество",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "price",
                    type: "number",
                    label: "Цена",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "brandId",
                    type: "selectAuto",
                    label: "Бренд",
                    selectProps: {
                        multiple: false,
                        items: brandsList.data
                            ? brandsList.data.map((brand) => {
                                  return {
                                      name: brand.name,
                                      value: brand.id,
                                  };
                              })
                            : [],
                    },
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "typePackagingId",
                    type: "select",
                    label: "Тип упаковки",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: packagingList.data
                            ? packagingList.data.map((item) => {
                                  return { name: item.name, value: item.id };
                              })
                            : [],
                    },
                },
                {
                    name: "isActive",
                    type: "select",
                    label: "Активность",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            { name: "Активен", value: "true" },
                            { name: "Не активен", value: "false" },
                        ],
                    },
                },
                {
                    name: "inStock",
                    type: "select",
                    label: "В наличии",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            { name: "Да", value: "true" },
                            { name: "Нет", value: "false" },
                        ],
                    },
                },
            ]}
            submit={submit}
            hasUploadImage={true}
            onCancel={closeModalAddContent}
        />
    );
};

export default AddSnackForm;
