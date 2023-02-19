import { FC } from "react";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { useTableAction } from "../../../../../hooks/useTableAction";
import { fishTypesCrudApi } from "../../../../../store/services/fish/fish.api";
import AddFishTypeForm from "../Forms/Additional/FishTypes/AddFishTypeForm";
import UpdFishTypeForm from "../Forms/Additional/FishTypes/UpdFishTypeForm";
import TableAdmin from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FishTypeFilterTable from "../Filters/FishTypeFilterTable";

const FishTypesTableAdmin: FC = () => {
    const { rows, addRow, updRow, removeRow, clearStateResponse, stateResponse } = useCatalog(fishTypesCrudApi);
    const { rowEdit, closeTableModal, rowDelete, isUpdAction, message } = useTableAction({
        successMessage: "Тип рыбы успешно добавлен",
        successMessageUpd: "Тип рыбы успешно обновлен",
        successMessageRemove: "Тип рыбы успешно удален"
    });    
    
    const handleDelete = (params:any) => {
        rowDelete(params, removeRow);
    }

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 100 },
                { field: "name", headerName: "Название", width: 500 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? <UpdFishTypeForm submit={updRow} /> : <AddFishTypeForm submit={addRow} />,
                titleModal: isUpdAction ?  "Обновить тип рыбы" : "Добавить тип рыбы",
                successMessage: message,
                width: "sm",
                closeModal: closeTableModal
            }}
            actionButtons={[
                {color: "primary", size: "small", onClick: rowEdit, icon: <EditIcon />},
                {color: "primary", size: "small", onClick: handleDelete, icon: <DeleteIcon />}
            ]}
            filterPanel={FishTypeFilterTable}
        />
    );
}

export default FishTypesTableAdmin;