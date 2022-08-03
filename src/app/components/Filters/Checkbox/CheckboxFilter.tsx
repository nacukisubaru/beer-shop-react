import { Card, Typography } from "@mui/material";
import React, { FC } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ICheckboxFilter } from "../../../types/checkbox.filter.types";
import "../css/style.css";

const CheckboxFilter: FC<ICheckboxFilter> = ({
    id,
    name,
    setFilter,
    selectedList,
}) => {
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
                                onClick={() => {
                                    setFilter(id);
                                }}
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
