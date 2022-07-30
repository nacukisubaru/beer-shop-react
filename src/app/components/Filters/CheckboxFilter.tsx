import { Card, Typography } from "@mui/material";
import React, { FC } from "react";
import "../Filters/css/style.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ICheckboxFilter {
    id: number;
    name: string;
    setFilter: () => void
}

const CheckboxFilter: FC<ICheckboxFilter> = ({ id, name, setFilter }) => {
    return (
        <>
            <div className="filter-container">
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onClick={setFilter} />}
                        label={name}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default CheckboxFilter;
