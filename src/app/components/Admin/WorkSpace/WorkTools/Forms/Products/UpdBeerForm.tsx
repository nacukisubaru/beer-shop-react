import { FC, useEffect } from "react";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../hooks/useCatalog";
import { beerApi } from "../../../../../../store/services/beers/beer.api";
import { brandApi } from "../../../../../../store/services/brands/brand.api";
import { gradeApi } from "../../../../../../store/services/grades/grade.api";
import { typePackagingApi } from "../../../../../../store/services/type-packaging/type-packaging.api";
import Form from "../Form";

interface UpdBeerFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const UpdBeerForm: FC<UpdBeerFormProps> = ({ submit }) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { data, isLoading, refetch } = beerApi.useGetOneQuery(detailId);
    const gradesList = gradeApi.useGetListQuery({});
    const brandsList = brandApi.useGetListQuery("beers");
    const packagingList = typePackagingApi.useGetListQuery("beers");

    const onSubmit = () => {
        refetch();
    };

    return (
        <>
            {isLoading ? (
                <></>
            ) : (
                <Form
                    fields={[
                        {
                            name: "title",
                            type: "text",
                            label: "Название",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.product?.title,
                        },
                        {
                            name: "description",
                            type: "text",
                            label: "Описание",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.product?.description,
                        },
                        {
                            name: "compound",
                            type: "text",
                            label: "Состав",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.compound,
                        },
                        {
                            name: "quantity",
                            type: "number",
                            label: "Количество",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.product?.quantity,
                        },
                        {
                            name: "price",
                            type: "number",
                            label: "Цена",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.product?.price,
                        },
                        {
                            name: "volume",
                            type: "number",
                            label: "Объём",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.volume,
                        },
                        {
                            name: "fortress",
                            type: "number",
                            label: "Крепкость",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.fortress,
                        },
                        {
                            name: "ibu",
                            type: "number",
                            label: "ibu",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.ibu,
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
                                defaultItems: data?.grades?.map((grade) => {
                                    return {
                                        value: grade.id,
                                        name: grade.name,
                                    };
                                }),
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
                                              value: brand,
                                          };
                                      })
                                    : [],
                                defaultItem: {
                                    name: data?.product?.brandName,
                                    value: data?.product?.brandId,
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
                                items: packagingList.data ? packagingList.data.map((item) => {return {name: item.name, value: item.id}}) : [],
                                defaultValue: data?.product?.typePackagingId,
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
                                defaultValue:
                                    data?.product?.isActive.toString(),
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
                                    {
                                        name: "Не фильтрованное",
                                        value: "false",
                                    },
                                ],
                                defaultValue: data?.filtered.toString(),
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
                                defaultValue: data?.forBottling.toString(),
                            },
                        },
                    ]}
                    submit={submit}
                    hasUploadImage={true}
                    defaultFile={data?.product.image}
                    updateId={detailId}
                    onSubmit={onSubmit}
                />
            )}
        </>
    );
};

export default UpdBeerForm;
