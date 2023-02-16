import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { beerApi } from "../../../../../../../store/services/beers/beer.api";
import { IBrand } from "../../../../../../../store/services/brands/types/brand.types";
import { IGrade } from "../../../../../../../store/services/grades/types/grade.type";
import { ITypePackaging } from "../../../../../../../store/services/type-packaging/types/type-packaging.types";
import Form from "../../Form";

interface UpdBeerFormProps {
    gradesList: IGrade[];
    brandsList: IBrand[];
    packagingList: ITypePackaging[];
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const UpdBeerForm: FC<UpdBeerFormProps> = ({ submit, gradesList, brandsList, packagingList }) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { data, isLoading, refetch } = beerApi.useGetOneQuery(detailId);
    const { closeModalAddContent } = useActions();

    const onSubmit = () => {
        refetch();
    };

    return (
        <>
            {isLoading  ? (
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
                                items: gradesList.map((grade) => {
                                    return {
                                        name: grade.name,
                                        value: grade.id,
                                    };
                                }),
                                defaultItems: data?.grades?.map((grade) => {
                                    return {
                                        value: grade.id,
                                        name: grade.name,
                                    };
                                }),
                                createSelectData:{name: "Создать сорт", link: "/admin/grades"}
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
                                items: brandsList.map((brand) => {
                                    return {
                                        name: brand.name,
                                        value: brand.id,
                                    };
                                }),
                                defaultItem: {
                                    name: data?.product?.brandName,
                                    value: data?.product?.brandId,
                                },
                                createSelectData:{name: "Создать бренд", link: "/admin/brands"}
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
                                    return {
                                        name: item.name,
                                        value: item.id,
                                    };
                                }),
                                defaultValue: data?.product?.typePackagingId,
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
                                defaultValue:
                                    data?.product?.isActive.toString(),
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
                                defaultValue: data?.product?.inStock.toString(),
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
                        {
                            name: "isPromote",
                            type: "select",
                            label: "Выводить на главной",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            selectProps: {
                                multiple: false,
                                items: [
                                    { name: "Да", value: "true" },
                                    { name: "Нет", value: "false" },
                                ],
                                defaultValue:
                                    data?.product?.isPromote?.toString(),
                            },
                        },
                    ]}
                    submit={submit}
                    hasUploadImage={true}
                    defaultFile={data?.product.image}
                    updateId={detailId}
                    nameSubmitBtn="Обновить"
                    onSubmit={onSubmit}
                    onCancel={closeModalAddContent}
                />
            )}
        </>
    );
};

export default UpdBeerForm;
