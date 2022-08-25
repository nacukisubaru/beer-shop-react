import React, { FC } from "react";
import CheckboxFilter from "./CheckboxFilter";

interface ICheckboxFilterList {
    list: {id: number, name:string}[];
    selectedList: number[];
    setFilter: (id:number) => void;
}

const CheckboxFilterList: FC<ICheckboxFilterList> = ({ list, selectedList, setFilter }) => {
    return (
        <>
            {list.map((item) => {
               return <CheckboxFilter
                    id={item.id}
                    name={item.name}
                    setFilter={setFilter}
                    selectedList={selectedList}
                />;
            })}
        </>
    );
};

export default CheckboxFilterList;
