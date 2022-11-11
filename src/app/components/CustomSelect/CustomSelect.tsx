import { Box, Button, Card, MenuItem, Select } from "@mui/material";
import { FC, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface SelectList {
    value: string;
    name: string;
}

interface CustomSelectProps {
    list: SelectList[];
    defaultSelectedItem?: string;
    action?: () => void;
}

const CustomSelect: FC<CustomSelectProps> = ({
    list,
    defaultSelectedItem,
    action,
}) => {
    const [currentSelectedItem, setSelectedItem] = useState<string>(
        defaultSelectedItem ? defaultSelectedItem : ""
    );

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Поля</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="select-choice-field"
                value={currentSelectedItem}
                label="Поля"
                onChange={() => {}}
            >
                {list.map((item) => {
                    return (
                        <MenuItem
                            onClick={() => {
                                setSelectedItem(item.value);
                                action && action();
                            }}
                            value={item.value}
                        >
                            {item.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;
