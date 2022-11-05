import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TableGrid from "../../Grid/TableGrid";
import WorkSpace from "./WorkSpace";

interface IAdminPanelProps {
    columnsTable: any;
    rowsTable: any;
    toolInWorkSpace: boolean;
}

const AdminPanel: FC<IAdminPanelProps> = ({
    columnsTable,
    rowsTable,
    toolInWorkSpace,
}) => {
    const location = useLocation();
    const [menuState, setMenu] = useState([
        { name: "Заказы", url: "/admin/orders", active: false },
        { name: "Пиво", url: "/admin/beers", active: false },
        { name: "Закуски", url: "/admin/snacks", active: false },
        { name: "Бренды", url: "/admin/brands", active: false },
        { name: "Сорта", url: "/admin/grades", active: false },
        { name: "Типы упаковок", url: "/admin/type-packaging", active: false },
    ]);

    useEffect(() => {
        const menuItems = menuState.map((item) => {
            if (item.url === location.pathname) {
                item.active = true;
            }
            return item;
        });
        setMenu(menuItems);
    }, [location, setMenu]);

    return (
        <WorkSpace
            menuItems={menuState}
            tool={
                toolInWorkSpace ? (
                    <TableGrid columns={columnsTable} rows={rowsTable} />
                ) : (
                    <>Добро пожаловать</>
                )
            }
        />
    );
};

export default AdminPanel;
