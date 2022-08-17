import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import SnackModal from "../../app/components/Modals/Products/SnackModal";
import SnacksList from "../../app/components/Products/Snacks/SnacksList";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { useAppSelector } from "../../app/hooks/useAppSelector";

export default function Snacks () {
    const { snack, snackList } = useAppSelector(
        (state) => state.snackReducer
    );
    return (
        <div className="page-container">
            <Header />
            <Menu
                 callbackApplyFilter={()=>{}}
                 callbackResetFilter={()=>{}}
            />
            <SnacksList />
            {snackList.length > 0 && !isEmptyObject(snack) && (<SnackModal />)}
        </div>
    );
}