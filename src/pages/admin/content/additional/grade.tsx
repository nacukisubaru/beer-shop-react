import AdminPanel from "../../../../app/components/Admin/WorkSpace/AdminPanel";
import GradeTableAdmin from "../../../../app/components/Admin/WorkSpace/WorkTools/Tables/GradeTable";

export default function GradeAdmin() {
    return (
        <>
            <AdminPanel workTool={<GradeTableAdmin />}/>
        </>
    );
}
