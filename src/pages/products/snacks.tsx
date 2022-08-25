import { useDispatch } from "react-redux";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import SnackModal from "../../app/components/Modals/Products/SnackModal";
import SnacksList from "../../app/components/Products/Snacks/SnacksList";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { useActions } from "../../app/hooks/useActions";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useFilter } from "../../app/hooks/useFilter";
import { limitPage } from "../../app/http/http.request.config";
import { getSnackList } from "../../app/store/services/snacks/reducers/snack.slice";

export default function Snacks () {
    const dispatch = useDispatch();
    const {fetchSnacksByFilter} = useFilter();
    const { snack, snackList } = useAppSelector(
        (state) => state.snackReducer
    );
    const minPrice: number = useAppSelector((state) => state.snackReducer.minPrice);
    const maxPrice: number = useAppSelector((state) => state.snackReducer.maxPrice);
    const {closeFilterMenu, dropSnackList, resetFilters} = useActions();

    const handleApplyFilter = () => {
        fetchSnacksByFilter();
        closeFilterMenu();
    };

    const handleResetFilter = async () => {
        closeFilterMenu();
        await resetFilters();
        await dropSnackList();
        await dispatch(getSnackList({path: '/snacks/', params: { page: 0, limitPage }}));
    };

    return (
        <div className="page-container">
            <Header />
            <Menu
                callbackApplyFilter={handleApplyFilter}
                callbackResetFilter={handleResetFilter}
                filter={{minPrice, maxPrice, productType:'snacks'}}
                filterList={[]}
            />
            <SnacksList />
            <ResultNotFoundByFilter />
            {snackList.length > 0 && !isEmptyObject(snack) && (<SnackModal />)}
        </div>
    );
}