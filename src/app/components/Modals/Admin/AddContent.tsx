import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";
interface AddContentProps {
    form: any,
    title: string
}

const AddContentModal: FC<AddContentProps> = ({form, title}) => {
    const {openModalAddContent, closeModalAddContent} = useActions();
    const {modalAddContent} = useAppSelector(state => state.contentReducer);
    
    return (
        <BasicModal
            setOpen={openModalAddContent}
            setClose={closeModalAddContent}
            open={modalAddContent}
            body={form}
            showOkBtn={false}
            title={title}
        />
    );
}

export default AddContentModal;