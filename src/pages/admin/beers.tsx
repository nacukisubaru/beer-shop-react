import AdminPanel from "../../app/components/Admin/WorkSpace/AdminPanel";
import BeerTableAdmin from "../../app/components/Admin/WorkSpace/WorkTools/Tables/BeerTable";

export default function BeerAdmin() {
    return (
        <>
            <AdminPanel workTool={<BeerTableAdmin />}/>
        </>
    );
}
