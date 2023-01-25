import { FC } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFilter } from "../../../hooks/useFilter";
import { limitPage } from "../../../http/http.request.config";
import { brandApi } from "../../../store/services/brands/brand.api";
import { getProductsList } from "../../../store/services/products/reducers/product.slice";
import { typePackagingApi } from "../../../store/services/type-packaging/type-packaging.api";
import { productType } from "../../../store/types/api.types";
import CheckboxFilterList from "../../Filters/Checkbox/CheckboxFilterList";
import RangeSliderFilter from "../../Filters/RangeSlider/RangeSliderFilter";
import ItemFilterMenu from "../Items/ItemFilterMenu";
import ItemMenu from "../Items/ItemMenu";
import TemporaryDrawer from "../TemporaryDrawer";

interface IMenu {
    filterList: any[],
    productType: productType
}

const Menu: FC<IMenu> = ({ productType, filterList = [] }) => {
    const brands: any = brandApi.useGetListByProductTypeQuery(productType);
    const typesPackaging: any = typePackagingApi.useGetListByProductTypeQuery(productType);
    const { fetchProductsByFilter } = useFilter(productType);
    const dispatch = useDispatch();
    const { sortField, order, typesPackagingIds, brandIds } = useAppSelector(
        (state) => state.filterProductsReducer
    );
    const { closeAllMenues, addBrand, addTypePackaging, setMinPrice, setMaxPrice, resetProductFilters, closeFilterMenu, setSearch, dropProductList} = useActions();
    const {isFilterMenu, isMainMenu} = useAppSelector(
        (state) => state.drawerMenuReducer
    );
    const productState = useAppSelector(
        (state) => state.productReducer
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

    const handleApplyFilter = () => {
        fetchProductsByFilter();
        closeFilterMenu();
    };

    const handleResetFilter = async () => {
        closeFilterMenu();
        await setSearch({ q: "" });
        await resetProductFilters();
        await dropProductList();
        await dispatch(
           getProductsList({
                path: `/${productType}/getListByFilter`,
                params: { sortField, order, page: 0, limitPage },
            })
        );
    };

    //TO DO рефакторинг нужно передавать массив объектов а в TemporaryDrawer в map вызывать ItemMenu и передавать аргументы
    //также нужно на onclick передавать вызов функции который переключит состояние меню off
    const arrayMenuList: any = [
        <ItemMenu name="Пиво" link="/products/beers" onClick={handleResetFilter}/>,
        <ItemMenu name="Закуски" link="/products/snacks" onClick={handleResetFilter}/>,
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
                    defaultMin={productState.minPrice} 
                    defaultMax={productState.maxPrice} 
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
            additionalList={[
                <ItemMenu name="Контакты" link="/contacts"/>,
                <ItemMenu name="О нас" link="/about-us" />,
            ]}
            position={isFilterMenu ? "right" : "left"}
            isOpen={isMainMenu || isFilterMenu ? true : false}
            close={closeAllMenues}
            showApplyBtn={isFilterMenu ? true : false}
            callbackApplyBtn={handleApplyFilter}
            callbackResetBtn={handleResetFilter}
        ></TemporaryDrawer>
    );
};

export default Menu;
