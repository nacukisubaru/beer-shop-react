import { Button, Grid, Menu, MenuItem } from "@mui/material";
import {
    GridSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

const ToolBarGrid: FC= () => {
    const {openModalAddContent} = useActions();
    const {showFilterInTool} = useAppSelector(state => state.contentReducer);

    return (
        <>
            {showFilterInTool && (
                <GridToolbarContainer>
                    <Grid container item xs>
                    
                            <GridToolbarFilterButton />
                    
                    </Grid>

                    <Grid>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {openModalAddContent()}}
                        >
                            Добавить
                        </Button>
                    </Grid>
                </GridToolbarContainer>
            )}
        </>
    );
};

export default ToolBarGrid;
