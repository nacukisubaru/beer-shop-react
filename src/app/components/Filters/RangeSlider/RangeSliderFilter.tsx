import React, { FC } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Input, TextField } from "@mui/material";

function valuetext(value: number) {
    return `${value}`;
}

interface IRangeSliderFilter {
    defaultMin: number;
    defaultMax: number;
    min: number;
    max: number;
    setFilterValue: (min: number, max: number) => void;
}

const RangeSliderFilter: FC<IRangeSliderFilter> = ({
    defaultMin,
    defaultMax,
    min,
    max,
    setFilterValue,
}) => {
    const stateMin = min ? min : defaultMin;
    const stateMax = max ? max : defaultMax;
    const [value, setValue] = React.useState<number[]>([stateMin, stateMax]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleSetPrice = () => {
        setFilterValue(value[0], value[1]);
    };

    const handleChangeSliderInputOne = (event:any) => {
        const val = event.target.value;
        setValue([val, value[1]]);
        setFilterValue(val, value[1]);
    };

    const handleChangeSliderInputTwo = (event:any) => {
        const val = event.target.value;
        setValue([value[0], val]);
        setFilterValue(value[0], val);
    };

    return (
        <Box sx={{ width: 314, marginLeft: "25px" }}>
            <Slider
                getAriaLabel={() => "slider range"}
                value={value}
                onChange={handleChange}
                onMouseUp={handleSetPrice}
                valueLabelDisplay="auto"
                min={defaultMin}
                max={defaultMax}
                getAriaValueText={valuetext}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "100px" }}>
                    <TextField
                        type="number"
                        label="Мин"
                        variant="outlined"
                        style={{ height: "41px" }}
                        size="small"
                        value={value[0]}
                        onChange={handleChangeSliderInputOne}
                    />
                </div>
                <div style={{ width: "100px" }}>
                    <TextField
                        type="number"
                        label="Макс"
                        variant="outlined"
                        size="small"
                        value={value[1]}
                        onChange={handleChangeSliderInputTwo}
                    />
                </div>
            </div>
        </Box>
    );
};

export default RangeSliderFilter;
