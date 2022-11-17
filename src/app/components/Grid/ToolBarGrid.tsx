import { Button, Grid, Menu, MenuItem } from "@mui/material";
import {
    GridSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { FC, useState } from "react";
import { useActions } from "../../hooks/useActions";

const ToolBarGrid: FC= () => {
    const {openModalAddContent} = useActions();

    return (
        <GridToolbarContainer>
            <Grid container item xs>
                {/* default buttons */}

                <GridToolbarColumnsButton  />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </Grid>

            <Grid>
                <Button
                    variant="contained"
                    size="small"
                    onClick={openModalAddContent}
                >
                    Добавить
                </Button>
            </Grid>
        </GridToolbarContainer>
    );
};

export default ToolBarGrid;
