import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { brandApi } from "../../../store/services/brands/brand.api";
import { gradeApi } from "../../../store/services/grades/grade.api";
import CheckboxFilterList from "../../Filters/Checkbox/CheckboxFilterList";
import ItemFilterMenu from "../Items/ItemFilterMenu";
import ItemMenu from "../Items/ItemMenu";
import TemporaryDrawer from "../TemporaryDrawer";

const Menu: FC = () => {
    const grades: any = gradeApi.useGradesListQuery(0);
    const brands: any = brandApi.useBrandsListQuery(0);

    const isFilterMenu = useAppSelector(
        (state) => state.drawerMenuReducer.isFilterMenu
    );
    const isMainMenu = useAppSelector(
        (state) => state.drawerMenuReducer.isMainMenu
    );
    const gradesList = useAppSelector(
        (state) => state.filterProductsReducer.grades
    );
    const brandsList = useAppSelector(
        (state) => state.filterProductsReducer.brandIds
    );

    const { closeAllMenues, addBrand, addGrade } = useActions();

    const arrayMenuList: any = [
        <ItemMenu name="Пиво" link="/products/beers" />,
        <ItemMenu name="Закуски" link="/products/snacks" />,
    ];

    const addBrandFilter = (id: number) => {
        return addBrand({ id });
    };

    const addGradeFilter = (id: number) => {
        return addGrade({ id });
    };

    const arrayFilterList: any = [
        <ItemFilterMenu
            name="Сорта"
            component={
                <CheckboxFilterList
                    list={grades.data}
                    selectedList={gradesList}
                    setFilter={addGradeFilter}
                />
            }
        />,
        <ItemFilterMenu
            name="Бренд"
            component={
                <CheckboxFilterList
                    list={brands.data}
                    selectedList={brandsList}
                    setFilter={addBrandFilter}
                />
            }
        />,
    ];

    return (
        <TemporaryDrawer
            name={isMainMenu ? "Категории" : "Фильтры"}
            arrayList={isMainMenu ? arrayMenuList : arrayFilterList}
            additionalList={[]}
            position={isFilterMenu ? "right" : "left"}
            isOpen={isMainMenu || isFilterMenu ? true : false}
            close={closeAllMenues}
        ></TemporaryDrawer>
    );
};

export default Menu;
