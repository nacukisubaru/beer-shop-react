import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import { brandApi } from "../../../../../../../store/services/brands/brand.api";
import { gradeApi } from "../../../../../../../store/services/grades/grade.api";
import { typePackagingApi } from "../../../../../../../store/services/type-packaging/type-packaging.api";
import Form from "../../Form";

interface AddGradeFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddGradeForm: FC<AddGradeFormProps> = ({ submit }) => {
    const { closeModalAddContent } = useActions();

    return (
        <Form
            fields={[
                {
                    name: "name",
                    type: "text",
                    label: "Название",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
            ]}
            submit={submit}
            onCancel={closeModalAddContent}
        />
    );
};

export default AddGradeForm;
