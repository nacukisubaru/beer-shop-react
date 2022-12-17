import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { brandApi } from "../../../store/services/brands/brand.api";
import { typePackagingApi } from "../../../store/services/type-packaging/type-packaging.api";
import CheckboxFilterList from "../../Filters/Checkbox/CheckboxFilterList";
import RangeSliderFilter from "../../Filters/RangeSlider/RangeSliderFilter";
import ItemFilterMenu from "../Items/ItemFilterMenu";
import ItemMenu from "../Items/ItemMenu";
import TemporaryDrawer from "../TemporaryDrawer";

interface IMenu {
    callbackApplyFilter: () => void,
    callbackResetFilter: () => void,
    filterList: any[],
    filter: {minPrice: number, maxPrice: number, productType: string}
}

const Menu: FC<IMenu> = ({callbackApplyFilter, callbackResetFilter, filter, filterList = []}) => {
    const brands: any = brandApi.useGetListByProductTypeQuery(filter.productType);
    const typesPackaging: any = typePackagingApi.useGetListByProductTypeQuery(filter.productType);

    const { closeAllMenues, addBrand, addTypePackaging, setMinPrice, setMaxPrice } = useActions();
    const {isFilterMenu, isMainMenu} = useAppSelector(
        (state) => state.drawerMenuReducer
    );

    const {typesPackagingIds, brandIds } = useAppSelector(
        (state) => state.filterProductsReducer
    );

    const minPrice = useAppSelector((state) => state.filterProductsReducer.minPrice);
    const maxPrice = useAppSelector((state) => state.filterProductsReducer.maxPrice);

    const addBrandFilter = (id: number) => {
        return addBrand({ id });
    };

    const addPackagingFilter = (id: number) => {
        return addTypePackaging({id});
    };

    const setMinMaxPrice = (min: number, max: number) => {
        setMinPrice({price: min});
        setMaxPrice({price: max});
    }
    //TO DO рефакторинг нужно передавать массив объектов а в TemporaryDrawer в map вызывать ItemMenu и передавать аргументы
    //также нужно на onclick передавать вызов функции который переключит состояние меню off
    const arrayMenuList: any = [
        <ItemMenu name="Пиво" link="/products/beers" onClick={callbackResetFilter}/>,
        <ItemMenu name="Закуски" link="/products/snacks" onClick={callbackResetFilter}/>,
    ];

    const arrayFilterList: any = [
        <ItemFilterMenu
            name="Бренд"
            key={"Бренд"}
            component={
                <CheckboxFilterList
                    list={brands.data}
                    selectedList={brandIds}
                    setFilter={addBrandFilter}
                />
            }
        />,

        <ItemFilterMenu
            name="Вид упаковки"
            key={"Вид упаковки"}
            component={
                <CheckboxFilterList
                    list={typesPackaging.data}
                    selectedList={typesPackagingIds}
                    setFilter={addPackagingFilter}
                />
            }
        />,
        
        <ItemFilterMenu
            name="Цена"
            key={"Цена"}
            component={
                <RangeSliderFilter 
                    defaultMin={filter.minPrice} 
                    defaultMax={filter.maxPrice} 
                    min={minPrice} max={maxPrice}
                    setFilterValue={setMinMaxPrice} 
                />
            }
        />
    ];

    return (
        <TemporaryDrawer
            name={isMainMenu ? "Категории" : "Фильтры"}
            arrayList={isMainMenu ? arrayMenuList : arrayFilterList.concat(filterList)}
            additionalList={[]}
            position={isFilterMenu ? "right" : "left"}
            isOpen={isMainMenu || isFilterMenu ? true : false}
            close={closeAllMenues}
            showApplyBtn={isFilterMenu ? true : false}
            callbackApplyBtn={callbackApplyFilter}
            callbackResetBtn={callbackResetFilter}
        ></TemporaryDrawer>
    );
};

export default Menu;
