import AdminPanel from "../../app/components/Admin/WorkSpace/AdminPanel";
import BrandTableAdmin from "../../app/components/Admin/WorkSpace/WorkTools/Tables/BrandTable";

export default function BrandAdmin() {
    return (
        <>
            <AdminPanel workTool={<BrandTableAdmin />}/>
        </>
    );
}
