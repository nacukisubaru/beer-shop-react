import { MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface SelectList {
    value: any;
    name: string;
}
interface CustomSelectProps {
    list: SelectList[];
    defaultSelectedItem?: string;
    defaultSelectedItemsMult?: string[];
    name?: string;
    id?: string;
    appearance?: "standard" | "outlined" | "filled";
    multiple?: boolean;
    sx?: any,
    action?: (value: any, name: any) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({
    list,
    defaultSelectedItem = "",
    defaultSelectedItemsMult = [],
    name,
    id,
    appearance,
    multiple,
    sx,
    action,
}) => {
    const [currentSelectedItem, setSelectedItem] = useState<string>(defaultSelectedItem);
    const [currentSelectedItemsMult, setSelectedItemsMult] = useState<string[]>(defaultSelectedItemsMult);

    const handleChangeMultiple = (
        event: any
    ) => {
        const { options } = event.target;
        if(options) {
            const value: string[] = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                    console.log( options[i])
                }
            }
            if(id) {
                action && action(value, id);
            }
            setSelectedItemsMult(value);
        }
    };

    return (
        <FormControl
            variant={appearance ? appearance : "standard"}
            sx={sx ? sx : {}}
            fullWidth
        >
            <InputLabel shrink id="demo-simple-select-label">
                {name ? name : "Select"}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="select-choice-field"
                value={
                    multiple ? currentSelectedItemsMult : currentSelectedItem
                }
                label={name ? name : "Select"}
                native={multiple && true}
                multiple={multiple && true}
                onChange={handleChangeMultiple}
            >
                {list.map((item) => {
                    if (multiple) {
                        return (
                            <option key={item.value} value={item.value}>
                                {item.name}
                            </option>
                        );
                    } else {
                        return (
                            <MenuItem
                                onClick={() => {
                                    setSelectedItem(item.value);
                                    action && action(item.value, id);
                                }}
                                value={item.value}
                            >
                                {item.name}
                            </MenuItem>
                        );
                    }
                })}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;
