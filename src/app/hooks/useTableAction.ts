import { useEffect, useState } from "react";
import { useActions } from "./useActions";

interface IMessage {
    successMessage: string;
    successMessageUpd: string;
    successMessageRemove: string;
}

export const useTableAction = (messages: IMessage) => {
    const { setDetailId, openModalAddContent } = useActions();
    const [isUpdAction, setUpdAction] = useState(false);
    const [message, setMessage] = useState<string>(messages.successMessage);

    const rowDelete = (params: any, remove: (id: number) => {}) => {
        const id = params.row.id;
        setMessage(messages.successMessageRemove);
        remove(id);
    }

    const rowEdit = async (params: any) => {
        const id = params.row.id;
        await setMessage(messages.successMessageUpd);
        await setUpdAction(true);
        await setDetailId({ id });
       
        console.log({message})
        console.log(messages.successMessageUpd)
        openModalAddContent();
    }

    useEffect(() => {
        setMessage(message);
        console.log(message);
    }, [message])

    const closeTableModal = () => {
        setUpdAction(false);
        setMessage(messages.successMessage);
    }

    return { rowEdit, rowDelete, closeTableModal, setUpdAction, setMessage, isUpdAction, message }
}