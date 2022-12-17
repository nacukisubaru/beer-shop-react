import React, { FC } from "react";
import { ICheckboxFilter } from "../../../types/checkbox.filter.types";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import "../css/style.css";

const CheckboxFilter: FC<ICheckboxFilter> = ({
    id,
    name,
    setFilter,
    selectedList,
}) => {
    const handleSetFilter = () => {
       return setFilter(id);
    }

    return (
        <>
            <div className="filter-container">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    selectedList.includes(id) ? true : false
                                }
                                onClick={handleSetFilter}
                            />
                        }
                        label={name}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default CheckboxFilter;
