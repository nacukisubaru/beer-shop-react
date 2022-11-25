import { FC, useEffect } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../../../store/services/brands/brand.api";
import { snackApi } from "../../../../../../../store/services/snacks/snack.api";
import { typePackagingApi } from "../../../../../../../store/services/type-packaging/type-packaging.api";
import Form from "../../Form";

interface UpdSnackFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const UpdSnackForm: FC<UpdSnackFormProps> = ({ submit }) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { data, isLoading, refetch } = snackApi.useGetOneQuery(detailId);
    const brandsList = brandApi.useGetListByProductTypeQuery("snacks");
    const packagingList = typePackagingApi.useGetListQuery("snacks");
    const { closeModalAddContent } = useActions();

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
                                items: brandsList.data
                                    ? brandsList.data.map((brand) => {
                                          return {
                                              name: brand.name,
                                              value: brand.id,
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
                                items: packagingList.data
                                    ? packagingList.data.map((item) => {
                                          return {
                                              name: item.name,
                                              value: item.id,
                                          };
                                      })
                                    : [],
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
                                defaultValue:
                                    data?.product?.inStock.toString(),
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

export default UpdSnackForm;
