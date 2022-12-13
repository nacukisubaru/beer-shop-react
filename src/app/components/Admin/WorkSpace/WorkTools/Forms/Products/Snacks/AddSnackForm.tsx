import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../../../store/services/brands/brand.api";
import { IBrand } from "../../../../../../../store/services/brands/types/brand.types";
import { typePackagingApi } from "../../../../../../../store/services/type-packaging/type-packaging.api";
import { ITypePackaging } from "../../../../../../../store/services/type-packaging/types/type-packaging.types";
import Form from "../../Form";

interface AddSnackFormProps {
    brandsList: IBrand[];
    packagingList: ITypePackaging[];
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddSnackForm: FC<AddSnackFormProps> = ({ brandsList, packagingList, submit }) => {
    const { closeModalAddContent } = useActions();
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
                        items: brandsList.map((brand) => {
                            return {
                                name: brand.name,
                                value: brand.id,
                            };
                        }),
                        createSelectData: {
                            name: "Создать бренд",
                            link: "/admin/brands",
                        },
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
                        items: packagingList.map((item) => {
                            return { name: item.name, value: item.id };
                        }),
                        createSelectData:{name: "Создать тип упаковки", link: "/admin/type-packaging"}
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
