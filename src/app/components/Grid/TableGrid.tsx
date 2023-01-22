import {
    DataGrid,
    getGridStringOperators,
    GridFilterPanel,
    GridSortItem,
} from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import ToolBarGrid from "./ToolBarGrid";
interface ITableGridProps {
    columns: any[];
    rows: any;
    pageSize: number;
    Pagination?: any;
    CustomFilterPanel?: any;
    toolBarOn?: boolean;
    sortingOnChange?: boolean;
    tableHeight?: number;
    onFilterPanelOpen?: () => void;
    onFilterPanelClose?: () => void;
}

const TableGrid: FC<ITableGridProps> = ({
    columns,
    rows,
    pageSize,
    CustomFilterPanel,
    Pagination,
    toolBarOn,
    sortingOnChange,
    tableHeight = 790,
    onFilterPanelOpen,
    onFilterPanelClose,
}) => {
    const { setContentSort, setContentDefaultSort } = useActions();
    const [sortModel, setSortModel] = useState<GridSortItem[]>([
        { field: "id", sort: "desc" },
    ]);
    const filterOperators = getGridStringOperators().filter(({ value }) =>
        ["contains", "equals" /* add more over time */].includes(value)
    );

    const handleSortChange = (sortArray: any) => {
        if (sortArray.length) {
            const field = sortArray[0].field;
            const sort = sortArray[0].sort;
            setSortModel([{ field, sort }]);
            if(sortingOnChange) {
                setContentSort({ field, sort: sort.toUpperCase() });
            }
        } else {
            if(sortingOnChange) {
                setContentDefaultSort();
            }
            setSortModel([]);
        }
    };
    const [componentSettings, setComponentSettings] = useState({});

    useEffect(() => {
        const settings: any = {
            FilterPanel: CustomFilterPanel
                ? CustomFilterPanel
                : GridFilterPanel,
        };
        if(toolBarOn) {
            settings.Toolbar = ToolBarGrid;
        }
        if (Pagination) {
            settings.Footer = Pagination;
        }
        setComponentSettings(settings);
    }, []);

    return (
        <div style={{ height: tableHeight, width: "100%", marginBottom: "10px" }}>
            <DataGrid
                rows={rows}
                columns={columns.map((item) => {
                    return { ...item, filterOperators };
                })}
                pageSize={pageSize}
                rowsPerPageOptions={[]}
                onSortModelChange={handleSortChange}
                checkboxSelection
                style={{ marginBottom: "40px" }}
                sortModel={sortModel}
                components={componentSettings}
                onPreferencePanelOpen={onFilterPanelOpen}
                onPreferencePanelClose={onFilterPanelClose}
                localeText={{
                    filterOperatorEquals: "Равняется",
                    filterOperatorContains: "Содержит в себе",
                    toolbarColumns: "Колонки",
                    toolbarFilters: "Фильтры",
                    toolbarDensity: "Высота строки",
                }}
            />
        </div>
    );
};

export default TableGrid;
