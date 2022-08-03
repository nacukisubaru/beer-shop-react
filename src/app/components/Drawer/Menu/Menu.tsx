import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFilter } from "../../../hooks/useFilter";
import { brandApi } from "../../../store/services/brands/brand.api";
import { gradeApi } from "../../../store/services/grades/grade.api";
import CheckboxFilterList from "../../Filters/Checkbox/CheckboxFilterList";
import RangeSliderFilter from "../../Filters/RangeSlider/RangeSliderFilter";
import ItemFilterMenu from "../Items/ItemFilterMenu";
import ItemMenu from "../Items/ItemMenu";
import TemporaryDrawer from "../TemporaryDrawer";

interface IMenu {
    callbackApplyFilter: () => void
}

const Menu: FC<IMenu> = ({callbackApplyFilter}) => {
    const grades: any = gradeApi.useGradesListQuery(0);
    const brands: any = brandApi.useBrandsListQuery(0);

    const { closeAllMenues, addBrand, addGrade, setMinPrice, setMaxPrice } = useActions();

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
    const minPrice = useAppSelector((state) => state.filterProductsReducer.minPriceDefault);
    const maxPrice = useAppSelector((state) => state.filterProductsReducer.maxPriceDefault);

    const addBrandFilter = (id: number) => {
        return addBrand({ id });
    };

    const addGradeFilter = (id: number) => {
        return addGrade({ id });
    };

    const setMinMaxPrice = (min: number, max: number) => {
        setMinPrice({price: min});
        setMaxPrice({price: max});
    }

    const arrayMenuList: any = [
        <ItemMenu name="Пиво" link="/products/beers" />,
        <ItemMenu name="Закуски" link="/products/snacks" />,
    ];

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
        
        <ItemFilterMenu 
            name="Цена"
            component={<RangeSliderFilter minPrice={minPrice} maxPrice={maxPrice} setFilterPrice={setMinMaxPrice} />}
        />
    ];

    return (
        <TemporaryDrawer
            name={isMainMenu ? "Категории" : "Фильтры"}
            arrayList={isMainMenu ? arrayMenuList : arrayFilterList}
            additionalList={[]}
            position={isFilterMenu ? "right" : "left"}
            isOpen={isMainMenu || isFilterMenu ? true : false}
            close={closeAllMenues}
            showApplyBtn={isFilterMenu ? true : false}
            callbackApplyBtn={callbackApplyFilter}
        ></TemporaryDrawer>
    );
};

export default Menu;
