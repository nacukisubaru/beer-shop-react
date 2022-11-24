import { useCatalog } from "../../../../../hooks/useCatalog";
import { gradeApi } from "../../../../../store/services/grades/grade.api";
import GradeFilterTable from "../Filters/GradeFilterTable";
import AddGradeForm from "../Forms/Additional/Grades/AddGradeForm";
import UpdGradeForm from "../Forms/Additional/Grades/UpdGradeForm";
import TableAdmin from "./Table";

export default function GradeTableAdmin() {
    const { rows, addRow, updRow, clearStateResponse, stateResponse } = useCatalog(gradeApi);
    console.log({rows})

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "name", headerName: "Название", width: 200 },
                { field: "code", headerName: "Символьный код", width: 150 }
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModalForAdd: <AddGradeForm submit={addRow} />,
                childrenModalForUpd: <UpdGradeForm submit={updRow} />,
                titleModalForAdd: "Добавить сорт",
                titleModalForUpd: "Обновить сорт",
                successMessage: "Сорт успешно добавлен",
            }}
            actions={{hasEdit: true, hasRemove: true}}
            filterPanel={GradeFilterTable}
        />
    );
}
