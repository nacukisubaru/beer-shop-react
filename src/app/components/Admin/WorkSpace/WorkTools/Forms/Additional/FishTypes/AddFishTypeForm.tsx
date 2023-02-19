import { FC } from "react";
import { useActions } from "../../../../../../../hooks/useActions";
import { IStateResponse } from "../../../../../../../hooks/useCatalog";
import Form from "../../Form";

interface AddFishTypeFormProps {
    submit: (body: any, isObject?: boolean) => Promise<IStateResponse>;
}

const AddFishTypeForm: FC<AddFishTypeFormProps> = ({ submit }) => {
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

export default AddFishTypeForm;
