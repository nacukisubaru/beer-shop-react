import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";
interface AddContentProps {
    form: any,
    title: string,
    width:'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl',
    onClose?: () => void
}

const AddContentModal: FC<AddContentProps> = ({form, title, width, onClose}) => {
    const {openModalAddContent, closeModalAddContent} = useActions();
    const {modalAddContent} = useAppSelector(state => state.contentReducer);
    
    const handleClose = () => {
        onClose && onClose();
        closeModalAddContent();
    }

    return (
        <BasicModal
            setOpen={openModalAddContent}
            setClose={handleClose}
            open={modalAddContent}
            body={form}
            width={width}
            showOkBtn={false}
            title={title}
        />
    );
}

export default AddContentModal;