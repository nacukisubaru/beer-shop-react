import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { gradeApi } from "../../../store/services/grades/grade.api";
import ItemFilterMenu from "../../Drawer/Items/ItemFilterMenu";
import CheckboxFilterList from "../../Filters/Checkbox/CheckboxFilterList";
import RangeSliderFilter from "../../Filters/RangeSlider/RangeSliderFilter";

const Filters: FC = () => {
    const grades: any = gradeApi.useGradesListQuery(0);
    const {
        setMinVolume,
        setMaxVolume,
        setMinFortress,
        setMaxFortress,
        addGrade,
    } = useActions();

    const { minVolume, maxVolume, minFortress, maxFortress } = useAppSelector(
        (state) => state.beerReducer
    );
    const { minVolumeVal, maxVolumeVal, minFortressVal, maxFortressVal } = useAppSelector(
        (state) => state.filterProductsReducer
    );

    const setMinMaxVolume = (min: number, max: number) => {
        setMinVolume({ minVolume: min });
        setMaxVolume({ maxVolume: max });
    };

    const setMinMaxFortress = (min: number, max: number) => {
        setMinFortress({ minFortress: min });
        setMaxFortress({ maxFortress: max });
    }
  
    const addGradeFilter = (id: number) => {
        return addGrade({ id });
    };

    const gradesList = useAppSelector(
        (state) => state.filterProductsReducer.grades
    );

    return (
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
            <ItemFilterMenu
                name="Объем"
                key={"Объем"}
                component={
                    <RangeSliderFilter
                        defaultMin={minVolume}
                        defaultMax={maxVolume}
                        min={minVolumeVal}
                        max={maxVolumeVal}
                        setFilterValue={setMinMaxVolume}
                    />
                }
            />
            <ItemFilterMenu 
                name="Крепкость"
                key={"Крепкость"}
                component={
                    <RangeSliderFilter 
                        defaultMin={minFortress}
                        defaultMax={maxFortress}
                        min={minFortressVal}
                        max={maxFortressVal}
                        setFilterValue={setMinMaxFortress}
                    />
                }
            />
        </>
    );
};

export default Filters;
