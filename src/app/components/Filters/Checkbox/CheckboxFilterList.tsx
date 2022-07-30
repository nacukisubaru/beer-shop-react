import React, { FC } from "react";
import { ICheckboxFilter } from "../../../types/checkbox.filter.types";
import CheckboxFilter from "./CheckboxFilter";

interface ICheckboxFilterList {
    list: ICheckboxFilter[];
}

const CheckboxFilterList: FC<ICheckboxFilterList> = ({ list }) => {
    return (
        <>
            {list.map((item) => {
               return <CheckboxFilter
                    id={item.id}
                    name={item.name}
                    setFilter={item.setFilter}
                />;
            })}
        </>
    );
};

export default CheckboxFilterList;
