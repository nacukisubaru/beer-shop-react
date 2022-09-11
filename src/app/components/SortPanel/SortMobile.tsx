import { MenuItem, Typography } from "@mui/material";
import { FC } from "react";

interface ISortMobile {
    name: string,
    fieldOrder: string,
    orderBy: string,
    sort: (sort: string[]) => void
}

const SortMobile: FC<ISortMobile> = ({name, fieldOrder, orderBy, sort}) => {
    const handleSort = () => {
        sort([fieldOrder, orderBy]);
    }

    return (
        <>
            <MenuItem>
                <Typography
                    variant="body1"
                    style={{ marginRight: "18px" }}
                    onClick={handleSort}
                >
                    {name}
                </Typography>
            </MenuItem>
        </>
    );
};

export default SortMobile;
