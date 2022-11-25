import AdminPanel from "../../../../app/components/Admin/WorkSpace/AdminPanel";
import TypePackagingTableAdmin from "../../../../app/components/Admin/WorkSpace/WorkTools/Tables/TypePackagingTable";

export default function TypePackagingAdmin() {
    return (
        <>
            <AdminPanel workTool={<TypePackagingTableAdmin />}/>
        </>
    );
}
