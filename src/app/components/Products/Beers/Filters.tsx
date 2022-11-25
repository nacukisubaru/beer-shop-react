import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { gradeApi } from "../../../store/services/grades/grade.api";
import ItemFilterMenu from "../../Drawer/Items/ItemFilterMenu";
import BoolCheckboxFilter from "../../Filters/BoolCheckbox/BoolCheckboxFilter";
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
        setFiltered,
        setBottling
    } = useActions();

    const { minVolumeDef, maxVolumeDef, minFortressDef, maxFortressDef } = useAppSelector(
        (state) => state.beerReducer
    );
    const { minVolume, maxVolume, minFortress, maxFortress, forBottling, filtered } = useAppSelector(
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

    const setBeerFilter = (filtered: boolean) => {
        setFiltered({filtered});
    }

    const setBeerIsBottling = (forBottling: boolean) => {
        setBottling({forBottling});
    }
    //TODO Рефакторинг можно сделать таким образом
    //1 Создать интерфейс он может в себя принимать необязательные свойства checkbox, boolCheckbox, rangeSlider
    //2 Каждое свойство содержит ряд свойств которые будут являтся пропсами для определенного выбранного типа компонента
    //3 Делаем компонент который будет на вход принимать массив объектов где объект будет под таким интерфейсом
    //Перебор объектов создание компонентов в зависимости от того что указали
    return (
        <>
            <ItemFilterMenu 
                name="Фильтрация"
                key={"Фильтрация"}
                component={
                    <BoolCheckboxFilter 
                        nameTrue="Фильтрованное"
                        nameFalse="Не фильтрованное"
                        setBoolFilter={setBeerFilter}
                        initialStateTrue={filtered === true ? filtered: false}
                        initialStateFalse={filtered === false ? true: false}
                    />
                }
            />
            <ItemFilterMenu 
                name="Разливное"
                key={"Разливное"}
                component={
                    <BoolCheckboxFilter 
                        nameTrue="Да"
                        nameFalse="Нет"
                        setBoolFilter={setBeerIsBottling}
                        initialStateTrue={forBottling === true ? forBottling: false}
                        initialStateFalse={forBottling === false ? true: false}
                    />
                }
            />
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
                        defaultMin={minVolumeDef}
                        defaultMax={maxVolumeDef}
                        min={minVolume}
                        max={maxVolume}
                        setFilterValue={setMinMaxVolume}
                    />
                }
            />
            <ItemFilterMenu 
                name="Крепкость"
                key={"Крепкость"}
                component={
                    <RangeSliderFilter 
                        defaultMin={minFortressDef}
                        defaultMax={maxFortressDef}
                        min={minFortress}
                        max={maxFortress}
                        setFilterValue={setMinMaxFortress}
                    />
                }
            />
        </>
    );
};

export default Filters;
