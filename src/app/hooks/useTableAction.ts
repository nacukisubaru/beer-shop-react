import { useEffect, useState } from "react";
import { useActions } from "./useActions";

interface IMessage {
    successMessage?: string;
    successMessageUpd?: string;
    successMessageRemove?: string;
}

export const useTableAction = (messages: IMessage) => {
    const { setDetailId, setDetailData, openModalAddContent } = useActions();
    const [isUpdAction, setUpdAction] = useState(false);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if(messages.successMessage) {
            setMessage(messages.successMessage);
        }
    }, [messages])

    const rowDelete = (params: any, remove: (id: number) => {}) => {
        const id = params.row.id;
        if(messages.successMessageRemove) {
            setMessage(messages.successMessageRemove);
        }
        remove(id);
    }

    const rowEdit = async (params: any) => {
        const id = params.row.id;
        if(messages.successMessageUpd) {
            await setMessage(messages.successMessageUpd);
        }
        await setUpdAction(true);
        await setDetailId({ id });
        await setDetailData({data: params.row});
        openModalAddContent();
    }

    const showDetail = async (params: any) => {
        const id = params.row.id;
        await setDetailId({ id });
        await setDetailData({data: params.row});
        openModalAddContent();
    }

    useEffect(() => {
        setMessage(message);
    }, [message])

    const closeTableModal = () => {
        setUpdAction(false);
        if(messages.successMessage) {
            setMessage(messages.successMessage);
        }
    }

    return { rowEdit, rowDelete, closeTableModal, setUpdAction, setMessage, showDetail, isUpdAction, message }
}