import React, { useEffect } from "react";
import { useFilter } from "../../app/hooks/useFilter";
import { useActions } from "../../app/hooks/useActions";
import { useDispatch } from "react-redux";
import { getBeerList } from "../../app/store/services/beers/reducers/beer.slice";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import BeersList from "../../app/components/Products/Beers/BeersList";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import BeerModal from "../../app/components/Modals/Products/BeerModal";
import "../../index.css";
import { limitPage } from "../../app/http/http.request.config";
import ItemFilterMenu from "../../app/components/Drawer/Items/ItemFilterMenu";
import CheckboxFilterList from "../../app/components/Filters/Checkbox/CheckboxFilterList";
import { gradeApi } from "../../app/store/services/grades/grade.api";

export default function Beers() {
    const { fetchBeersByFilter } = useFilter();
    const { resetFilters, dropBeerList, closeFilterMenu, addGrade } = useActions();
    const { beer, beerList } = useAppSelector(
        (state) => state.beerReducer
    );

    const minPrice:number = useAppSelector((state) => state.beerReducer.minPrice);
    const maxPrice:number = useAppSelector((state) => state.beerReducer.maxPrice);

    const dispath = useDispatch();

    const handleApplyFilter = () => {
        fetchBeersByFilter();
        closeFilterMenu();
    };

    const handleResetFilter = async () => {
        closeFilterMenu();
        await resetFilters();
        await dropBeerList();
        await dispath(getBeerList({path: '/beers/', params: { page: 0, limitPage }}));
    };

    const grades: any = gradeApi.useGradesListQuery(0);
    
    const addGradeFilter = (id: number) => {
        return addGrade({ id });
    };

    const gradesList = useAppSelector(
        (state) => state.filterProductsReducer.grades
    );

    return (
        <div className="page-container">
            <Header />
            <Menu
                callbackApplyFilter={handleApplyFilter}
                callbackResetFilter={handleResetFilter}
                filter={{minPrice, maxPrice, brandType: 'beers'}}
                filterList={[
                    <>         
                        <ItemFilterMenu
                            key={"Сорта"}
                            name="Сорта"
                            component={
                                <CheckboxFilterList
                                    list={grades.data}
                                    selectedList={gradesList}
                                    setFilter={addGradeFilter}
                                />
                            }
                        />
                    </>
                ]
                }
            />
            <BeersList />
            <ResultNotFoundByFilter />
            {beerList.length > 0 && !isEmptyObject(beer) && (
                 <BeerModal />
            )}
        </div>
    );
}
