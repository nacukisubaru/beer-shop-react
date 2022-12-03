import { useCatalog } from "../../../../../hooks/useCatalog";
import { gradeApi } from "../../../../../store/services/grades/grade.api";
import GradeFilterTable from "../Filters/GradeFilterTable";
import AddGradeForm from "../Forms/Additional/Grades/AddGradeForm";
import UpdGradeForm from "../Forms/Additional/Grades/UpdGradeForm";
import TableAdmin from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTableAction } from "../../../../../hooks/useTableAction";

export default function GradeTableAdmin() {
    const { rows, addRow, updRow, removeRow, clearStateResponse, stateResponse } = useCatalog(gradeApi);
    const { rowEdit, closeTableModal, rowDelete, isUpdAction, message } = useTableAction({
        successMessage: "Сорт успешно добавлен",
        successMessageUpd: "Сорт успешно обновлен",
        successMessageRemove: "Сорт успешно удален"
    });

    const handleDelete = (params:any) => {
        rowDelete(params, removeRow);
    }

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "name", headerName: "Название", width: 200 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? <UpdGradeForm submit={updRow} /> : <AddGradeForm submit={addRow} />,
                titleModal: isUpdAction ? "Обновить сорт" : "Добавить сорт",
                successMessage: message,
                width: "sm",
                closeModal: closeTableModal
            }}
            actionButtons={[
                {color: "primary", size: "small", onClick: rowEdit, icon: <EditIcon />},
                {color: "primary", size: "small", onClick: handleDelete, icon: <DeleteIcon />}
            ]}
            filterPanel={GradeFilterTable}
        />
    );
}
