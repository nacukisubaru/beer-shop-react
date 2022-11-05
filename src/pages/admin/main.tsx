import AdminPanel from "../../app/components/Admin/WorkSpace/AdminPanel";
import WorkSpace from "../../app/components/Admin/WorkSpace/WorkSpace";

export default function MainAdmin() {
    return (
        <>
           <AdminPanel columnsTable={[]} rowsTable={[]} toolInWorkSpace={false}></AdminPanel>
        </>
    );
}