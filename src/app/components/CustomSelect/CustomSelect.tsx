import { MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface SelectList {
    value: string;
    name: string;
}
interface CustomSelectProps {
    list: SelectList[];
    defaultSelectedItem?: string;
    name?: string;
    appearance?: "standard" | "outlined" | "filled";
    multiple?: boolean;
    sx?: any,
    action?: (value: string) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({
    list,
    defaultSelectedItem,
    name,
    appearance,
    multiple,
    sx,
    action,
}) => {
    const [currentSelectedItem, setSelectedItem] = useState<string>(
        defaultSelectedItem ? defaultSelectedItem : ""
    );
    const [currentSelectedItemsMult, setSelectedItemsMult] = useState<string[]>(
        []
    );

    const handleChangeMultiple = (
        event: any
    ) => {
        const { options } = event.target;
        if(options) {
            const value: string[] = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
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
                                    action && action(item.value);
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
