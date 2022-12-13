import { CircularProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCheckUserRoleAdminQuery } from "../../../store/services/roles/role.api";
import WorkSpace from "./WorkSpace";
interface IAdminPanelProps {
    workTool?: any;
}

const AdminPanel: FC<IAdminPanelProps> = ({ workTool }) => {
   // const location = useLocation();
    const [menuState, setMenu] = useState([
        { name: "Заказы", url: "/admin/orders", active: false },
        { name: "Пиво", url: "/admin/beers", active: false },
        { name: "Закуски", url: "/admin/snacks", active: false },
        { name: "Бренды", url: "/admin/brands", active: false },
        { name: "Сорта", url: "/admin/grades", active: false },
        { name: "Типы упаковок", url: "/admin/type-packaging", active: false },
    ]);
    const { data, isLoading } = useCheckUserRoleAdminQuery({});
    const [showWorkSpace, setShowWorkSpace] = useState(false);
    const [isDefinedWorkSpace, setDefinedWorkSpace] = useState(false);

    // useEffect(() => {
    //     const menuItems = menuState.map((item) => {
    //         if (item.url === location.pathname) {
    //             item.active = true;
    //         }
    //         return item;
    //     });
    //     setMenu(menuItems);
    // }, [location, setMenu]);

    useEffect(() => {
        if (data === true) {
            setShowWorkSpace(true);
        } else {
            setShowWorkSpace(false);
        }
        setDefinedWorkSpace(true);
    }, [data]);

    return isLoading || !isDefinedWorkSpace ? (
        <CircularProgress />
    ) : showWorkSpace ? (
        <WorkSpace menuItems={menuState} tool={workTool} />
    ) : (
        <>404</>
    );
};

export default AdminPanel;
