import AdminPanel from "../../app/components/Admin/WorkSpace/AdminPanel";
import SnacksTableAdmin from "../../app/components/Admin/WorkSpace/WorkTools/Tables/SnacksTable";

export default function SnacksAdmin() {
    return (
        <>
            <AdminPanel workTool={<SnacksTableAdmin />}/>
        </>
    );
}
