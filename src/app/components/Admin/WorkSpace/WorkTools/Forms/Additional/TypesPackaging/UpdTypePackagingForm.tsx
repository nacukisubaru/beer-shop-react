import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { useGetProductTypesQuery } from "../../../../../../../store/services/product-types/product-types.api";
import { typePackagingApi } from "../../../../../../../store/services/type-packaging/type-packaging.api";
import Form from "../../Form";

interface UpdTypePackagingFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const UpdTypePackagingForm: FC<UpdTypePackagingFormProps> = ({ submit }) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { data, isLoading, refetch } = typePackagingApi.useGetOneQuery(detailId);
    const productTypes = useGetProductTypesQuery({});
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
                            name: "name",
                            type: "text",
                            label: "Название",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            defaultValue: data?.name,
                        },
                        {
                            name: "productTypeId",
                            type: "selectAuto",
                            label: "Тип товара",
                            selectProps: {
                                multiple: false,
                                items: productTypes.data
                                    ? productTypes.data.map((item: any) => {
                                          return {
                                              name: item.name,
                                              value: item.id,
                                          };
                                      })
                                    : [],
                                defaultItem: {
                                    name: data?.productType.name,
                                    value: data?.productType.id,
                                },
                            },
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                        },
                    ]}
                    submit={submit}
                    updateId={detailId}
                    nameSubmitBtn="Обновить"
                    onSubmit={onSubmit}
                    onCancel={closeModalAddContent}
                />
            )}
        </>
    );
};

export default UpdTypePackagingForm;
