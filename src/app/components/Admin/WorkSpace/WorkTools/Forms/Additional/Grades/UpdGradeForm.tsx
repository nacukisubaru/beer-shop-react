import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { gradeApi } from "../../../../../../../store/services/grades/grade.api";
import Form from "../../Form";

interface UpdGradeFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const UpdGradeForm: FC<UpdGradeFormProps> = ({ submit }) => {
    const { detailId } = useAppSelector((state) => state.contentReducer);
    const { data, isLoading, refetch } = gradeApi.useGetOneQuery(detailId);
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

export default UpdGradeForm;
