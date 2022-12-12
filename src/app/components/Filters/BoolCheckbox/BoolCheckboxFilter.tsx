import React, { FC, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import "../css/style.css";

interface IBoolCheckboxFilter {
    nameTrue: string,
    nameFalse: string,
    initialStateTrue: boolean,
    initialStateFalse: boolean,
    setBoolFilter: (value:boolean) => void
}

const BoolCheckboxFilter: FC<IBoolCheckboxFilter> = ({
    nameTrue,
    nameFalse,
    initialStateTrue,
    initialStateFalse,
    setBoolFilter,
 
}) => {
    const [stateCheckboxTrue, setStateCheckboxTrue] = useState(initialStateTrue);
    const [stateCheckboxFalse, setStateCheckboxFalse] = useState(initialStateFalse);

    const handleSetFilterTrue = () => {
        setStateCheckboxTrue(true);
        setStateCheckboxFalse(false);
        return setBoolFilter(true);
    }

    const handleSetFilterFalse = () => {
        setStateCheckboxFalse(true);
        setStateCheckboxTrue(false);
        return setBoolFilter(false);
    }

    return (
        <>
            <div className="filter-container">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={stateCheckboxTrue}
                                onClick={handleSetFilterTrue}
                            />
                        }
                        label={nameTrue}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={stateCheckboxFalse}
                                onClick={handleSetFilterFalse}
                            />
                        }
                        label={nameFalse}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default BoolCheckboxFilter;
