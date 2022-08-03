import React, { FC } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
    return `${value}°C`;
}

interface IRangeSliderFilter {
    minPrice: number,
    maxPrice: number
    setFilterPrice: (min: number, max: number) => void
}

const RangeSliderFilter:FC<IRangeSliderFilter> = ({minPrice, maxPrice, setFilterPrice}) => {
    const [value, setValue] = React.useState<number[]>([minPrice, maxPrice]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        // const arrayValues:any = newValue;
        // const min:number = arrayValues[0];
        // const max:number = arrayValues[1];
        // setFilterPrice(min, max);
        setValue(newValue as number[]);
    };
    const handleSetPrice = () => {
        setFilterPrice(value[0], value[1]);
    }

    // const handleChange = (event: Event, newValue:  number | number[]) => {
    //     const arrayValues:any = newValue;
    //     const min:number = arrayValues[0];
    //     const max:number = arrayValues[1];
    //     return setFilterPrice(min, max);
    // };

    return (
        <Box sx={{ width: 314, marginLeft: '25px' }}>
            <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                onMouseUp={handleSetPrice}
                valueLabelDisplay="auto"
                min={minPrice} 
                max={maxPrice} 
                getAriaValueText={valuetext}
            />
        </Box>
    );
};

export default RangeSliderFilter;