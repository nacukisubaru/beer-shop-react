import { FC } from "react";
import AdminPanel from "../../app/components/Admin/WorkSpace/AdminPanel";
import FishTypesTableAdmin from "../../app/components/Admin/WorkSpace/WorkTools/Tables/FishTypesTable";

const FishTypes: FC = () => {
    return (
        <>
            <AdminPanel workTool={<FishTypesTableAdmin />}/>
        </>
    );
}

export default FishTypes; 