import { FC, useEffect, useState } from "react";
import { useActions } from "../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../hooks/useCatalog";
import { orderStatusApi } from "../../../../../../store/services/order/order.api";
import { IOrderStatus } from "../../../../../../store/services/order/types/order.types";
import Form from "../Form";

interface OrderFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const OrderForm: FC<OrderFormProps> = ({ submit }) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { detailData } = useAppSelector((state) => state.contentReducer);
    const { closeModalAddContent } = useActions();
    const statusList = orderStatusApi.useGetListQuery({});
    const [statusData, setStatusData] = useState<IOrderStatus>({
        id: 0,
        statusName: '',
        status: '',
        color: ''
    });
    
    
    useEffect(() => {
        setStatusData({...detailData.status});
    }, [detailData]);
    
    return (
        <>
            {statusData.id && (
                <Form
                    fields={[
                        {
                            name: "statusId",
                            type: "select",
                            label: "Статус",
                            validationProps: {
                                required: "Поле обязательно для заполнения",
                            },
                            selectProps: {
                                multiple: false,
                                items: statusList.data
                                    ? statusList.data.map(
                                          (item: IOrderStatus) => {
                                              return {
                                                  name: item.statusName,
                                                  value: item.id,
                                              };
                                          }
                                      )
                                    : [],
                                defaultValue: statusData?.id,
                            },
                        },
                    ]}
                    submit={submit}
                    updateId={detailId}
                    onCancel={closeModalAddContent}
                />
            )}
        </>
    );
};

export default OrderForm;
