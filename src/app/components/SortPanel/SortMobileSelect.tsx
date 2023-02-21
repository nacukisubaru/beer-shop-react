import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { FC, useState } from "react";

interface ISortItemsList {
    name: string;
    fieldOrder: string;
    orderBy: string;
}

interface ISortMobile {
    sortItemsList: ISortItemsList[];
    sort: (sortField: string, order: string) => void;
}

const SortMobileSelect: FC<ISortMobile> = ({ sortItemsList, sort }) => {
    const handleSort = (fieldOrder: string, orderBy: string) => {
        sort(fieldOrder, orderBy);
    };

    const [sortItem, setSort] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };

    return (
        <Select label="Сортировка" value={sortItem} onChange={handleChange}>
            {sortItemsList.map((item) => {
                return (
                    <MenuItem
                        key={item.name}
                        value={item.name}
                        onClick={() => {
                            handleSort(item.fieldOrder, item.orderBy);
                        }}
                    >
                        <Typography
                            key={item.name}
                            variant="body1"
                            style={{ marginRight: "18px" }}
                        >
                            {item.name}
                        </Typography>
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default SortMobileSelect;
