import AdminPanel from "../../app/components/Admin/WorkSpace/AdminPanel";
import FishTableAdmin from "../../app/components/Admin/WorkSpace/WorkTools/Tables/FishTable";

export default function FishAdmin() {
    return (
        <>
            <AdminPanel workTool={<FishTableAdmin />}/>
        </>
    );
}
