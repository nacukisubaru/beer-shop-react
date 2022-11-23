import { FC } from "react";
import { IStateResponse } from "../../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../../store/services/brands/brand.api";
import { gradeApi } from "../../../../../../store/services/grades/grade.api";
import { typePackagingApi } from "../../../../../../store/services/type-packaging/type-packaging.api";
import Form from "../Form";

interface AddBeerFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddBeerForm: FC<AddBeerFormProps> = ({ submit }) => {
    const gradesList = gradeApi.useGetListQuery({});
    const brandsList = brandApi.useGetListQuery("beers");
    const packagingList = typePackagingApi.useGetListQuery("beers");

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
                    name: "volume",
                    type: "number",
                    label: "Объём",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "fortress",
                    type: "number",
                    label: "Крепкость",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "ibu",
                    type: "number",
                    label: "ibu",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "gradeIds",
                    type: "selectAuto",
                    label: "Сорта",
                    selectProps: {
                        multiple: true,
                        items: gradesList.data
                            ? gradesList.data.map((grade) => {
                                  return {
                                      name: grade.name,
                                      value: grade.id,
                                  };
                              })
                            : [],
                    },
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
                    name: "filtered",
                    type: "select",
                    label: "Фильтрация",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            { name: "Фильтрованное", value: "true" },
                            { name: "Не фильтрованное", value: "false" },
                        ],
                    },
                },
                {
                    name: "forBottling",
                    type: "select",
                    label: "Розлив",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            { name: "Розливное", value: "true" },
                            { name: "Не розливное", value: "false" },
                        ],
                    },
                },
            ]}
            submit={submit}
            hasUploadImage={true}
        />
    );
};

export default AddBeerForm;
