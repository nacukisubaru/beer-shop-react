import { Button, Grid, Menu, MenuItem } from "@mui/material";
import {
    GridSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { FC, useState } from "react";

interface IToolBarGridProps {
    selectionModel: GridSelectionModel;
};

const ToolBarGrid: FC<IToolBarGridProps> = ({ selectionModel }) => {
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLButtonElement>(
        null
    );
    const openMenu = Boolean(anchorElMenu);

    return (
        <GridToolbarContainer>
            <Grid container item xs>
                {/* default buttons */}

                <GridToolbarColumnsButton name="Колонки" />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </Grid>

            <Grid>
                <Button
                    variant="contained"
                    size="small"
                   // disabled={selectionModel.length === 0}
                    //startIcon={<MoreVertIcon />}
                    onClick={(event: any) => {
                        setAnchorElMenu(event.currentTarget);
                    }}
                >
                    Добавить
                </Button>

                {/* <Menu
                    id="menu-options"
                    anchorEl={anchorElMenu}
                    open={openMenu}
                    onClose={() => {
                        setAnchorElMenu(null);
                    }}
                >
                    <MenuItem /> //Clipped
                    <MenuItem /> //Clipped
                    <MenuItem /> //Clipped
                </Menu> */}
            </Grid>
        </GridToolbarContainer>
    );
};

export default ToolBarGrid;
