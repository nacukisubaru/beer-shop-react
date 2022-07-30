import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import ItemMenu from "../Items/ItemMenu";
import TemporaryDrawer from "../TemporaryDrawer";

const Menu: FC = () => {
    const isFilterMenu = useAppSelector(
        (state) => state.drawerMenuReducer.isFilterMenu
    );
    const isMainMenu = useAppSelector(
        (state) => state.drawerMenuReducer.isMainMenu
    );

    const { closeAllMenues } = useActions();

    const arrayMenuList: any = [
        <ItemMenu name="Пиво" link="/products/beers" />,
        <ItemMenu name="Закуски" link="/products/snacks" />,
    ];

    const arrayFilterList: any = [];

    return (
        <TemporaryDrawer
            arrayList={isMainMenu ? arrayMenuList : arrayFilterList}
            additionalList={[]}
            position={isFilterMenu ? "right" : "left"}
            isOpen={isMainMenu || isFilterMenu ? true : false}
            close={closeAllMenues}
        ></TemporaryDrawer>
    );
};

export default Menu;
