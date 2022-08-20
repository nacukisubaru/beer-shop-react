import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { brandApi } from "../../../store/services/brands/brand.api";
import CheckboxFilterList from "../../Filters/Checkbox/CheckboxFilterList";
import RangeSliderFilter from "../../Filters/RangeSlider/RangeSliderFilter";
import ItemFilterMenu from "../Items/ItemFilterMenu";
import ItemMenu from "../Items/ItemMenu";
import TemporaryDrawer from "../TemporaryDrawer";

interface IMenu {
    callbackApplyFilter: () => void,
    callbackResetFilter: () => void,
    filterList: any[],
    filter: {minPrice: number, maxPrice: number, brandType: string}
}

const Menu: FC<IMenu> = ({callbackApplyFilter, callbackResetFilter, filter, filterList = []}) => {
    const brands: any = brandApi.useBrandsListQuery(filter.brandType);
    const { closeAllMenues, addBrand, setMinPrice, setMaxPrice } = useActions();
    const isFilterMenu = useAppSelector(
        (state) => state.drawerMenuReducer.isFilterMenu
    );
    const isMainMenu = useAppSelector(
        (state) => state.drawerMenuReducer.isMainMenu
    );
    const brandsList = useAppSelector(
        (state) => state.filterProductsReducer.brandIds
    );
    const minPrice = useAppSelector((state) => state.filterProductsReducer.minPrice);
    const maxPrice = useAppSelector((state) => state.filterProductsReducer.maxPrice);

    const addBrandFilter = (id: number) => {
        return addBrand({ id });
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
            name="Бренд"
            key={"Бренд"}
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
            key={"Цена"}
            component={
                <RangeSliderFilter 
                    defaultMin={filter.minPrice} 
                    defaultMax={filter.maxPrice} 
                    min={minPrice} max={maxPrice}
                    setFilterPrice={setMinMaxPrice} 
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
