import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { IBrand } from "../../../../../../../store/services/brands/types/brand.types";
import { fishApi } from "../../../../../../../store/services/fish/fish.api";
import { IFishType } from "../../../../../../../store/services/fish/types/fish.type";
import { ITypePackaging } from "../../../../../../../store/services/type-packaging/types/type-packaging.types";
import Form from "../../Form";

interface UpdFishFormProps {
    brandsList: IBrand[];
    packagingList: ITypePackaging[];
    fishTypesList: IFishType[];
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const UpdFishForm: FC<UpdFishFormProps> = ({
    brandsList,
    packagingList,
    fishTypesList,
    submit,
}) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { data, isLoading, refetch } = fishApi.useGetOneQuery(detailId);
    const { closeModalAddContent } = useActions();

    const onSubmit = () => {
        refetch();
    };
    console.log(data?.fishTypeId);
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
                            name: "weight",
                            type: "number",
                            label: "Вес",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.weight,
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
                            },
                        },
                        {
                            name: "fishTypeId",
                            type: "select",
                            label: "Тип рыбы",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            selectProps: {
                                multiple: false,
                                items: fishTypesList.map((item: IFishType) => {
                                    return { name: item.name, value: item.id };
                                }),
                              
                                defaultValue: data?.fishTypeId,
                                createSelectData: {
                                    name: "Создать тип рыбы",
                                    link: "/admin/fish-types",
                                },
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

export default UpdFishForm;
