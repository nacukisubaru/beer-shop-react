import AdminPanel from "../../app/components/Admin/WorkSpace/AdminPanel";
import OrderTableAdmin from "../../app/components/Admin/WorkSpace/WorkTools/Tables/OrderTable";

export default function OrdersAdmin() {
    return (
        <>
            <AdminPanel workTool={<OrderTableAdmin />}/>
        </>
    );
}
