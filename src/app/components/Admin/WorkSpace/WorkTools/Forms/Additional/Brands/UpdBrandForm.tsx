import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../../../store/services/brands/brand.api";
import Form from "../../Form";

interface UpdBrandFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const UpdBrandForm: FC<UpdBrandFormProps> = ({ submit }) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { data, isLoading, refetch } = brandApi.useGetOneQuery(detailId);
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
                                items:  [
                                    { name: "Пиво", value: 1 },
                                    { name: "Закуски", value: 2 },
                                ],
                                defaultItem: {
                                    name: data?.productType.name,
                                    value: data?.productType.id,
                                }
                            },
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },             
                        }
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

export default UpdBrandForm;
