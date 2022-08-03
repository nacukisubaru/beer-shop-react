import React, { FC } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
    return `${value}`;
}

interface IRangeSliderFilter {
    defaultMin: number,
    defaultMax: number,
    min: number,
    max: number,
    setFilterPrice: (min: number, max: number) => void
}

const RangeSliderFilter:FC<IRangeSliderFilter> = ({defaultMin, defaultMax, min, max, setFilterPrice}) => {
    const stateMin = min ? min : defaultMin;
    const stateMax = max ? max : defaultMax;
    const [value, setValue] = React.useState<number[]>([stateMin, stateMax]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleSetPrice = () => {
        setFilterPrice(value[0], value[1]);
    }

    return (
        <Box sx={{ width: 314, marginLeft: '25px' }}>
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
        </Box>
    );
};

export default RangeSliderFilter;