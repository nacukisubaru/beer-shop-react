import { useActions } from "../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useCatalog } from "../../../../../hooks/useCatalog";
import { beerApi } from "../../../../../store/services/beers/beer.api";
import TableGrid from "../../../../Grid/TableGrid";
import ResultNotFoundByFilter from "../../../../Modals/Messages/ResultNotFoundByFilter";
import BeerFilterTable from "../Filters/BeerFilterTable";
import PaginationTable from "../Pagination/PaginationTable";

export default function BeerTableAdmin() {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Название", width: 200 },
        { field: "description", headerName: "Описание", width: 150 },
        { field: "price", headerName: "Цена", width: 150 },
        { field: "quantity", headerName: "Количество", width: 150, filterable: false },
        { field: "isActive", headerName: "Активность", width: 150 },
        { field: "inStock", headerName: "В наличии", width: 150 },
        { field: "brandName", headerName: "Название бренда", width: 150 },
        { field: "typePackagingName", headerName: "Тип упаковки", width: 150 },
        { field: "compound", headerName: "Состав", width: 150, filterable: false },
        { field: "volume", headerName: "Объем", width: 150, filterable: false },
        { field: "fortress", headerName: "Крепкость", width: 150, filterable: false },
        { field: "ibu", headerName: "ibu", width: 150, filterable: false },
        { field: "forBottling", headerName: "На розлив", width: 150 },
        { field: "filtred", headerName: "Фильтрованное", width: 150 },
    ];
    const { rows } = useCatalog(beerApi, 'beer');
    const { limitPage } = useAppSelector(state => state.contentReducer);
    const { setFilters, setRequestFilterDisabled, openAdminModalNotFoundByFilter, closeAdminModalNotFoundByFilter } = useActions();
    const { tmpfilters } = useAppSelector(state => state.contentReducer);
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.adminModalNotFoundByFilter
    );

    const handlerPanelOpen = async () => {
        await setRequestFilterDisabled({disable: true});
        setFilters(tmpfilters);
    }

    const handlerPanelClose = () => {
        setRequestFilterDisabled({disable: false});
    }

    return (
        <>
            <TableGrid
                columns={columns}
                rows={rows}
                pageSize={limitPage}
                CustomFilterPanel={BeerFilterTable}
                Pagination={PaginationTable}
                onFilterPanelOpen={handlerPanelOpen}
                onFilterPanelClose={handlerPanelClose}
            />
            <ResultNotFoundByFilter 
                openModalNotFoundByFilter={openAdminModalNotFoundByFilter} 
                closeModalNotFoundByFilter={closeAdminModalNotFoundByFilter} 
                isOpen={isOpen} 
            />
        </>
    );
}
