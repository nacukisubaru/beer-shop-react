import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import Menu from "../../app/components/Drawer/Menu/Menu";
import Header from "../../app/components/Header/Header";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import SnackModal from "../../app/components/Modals/Products/SnackModal";
import ProductsList from "../../app/components/Products/ProductsList";
import SnacksList from "../../app/components/Products/Snacks/SnacksList";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { useActions } from "../../app/hooks/useActions";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useFilter } from "../../app/hooks/useFilter";
import { limitPage } from "../../app/http/http.request.config";
import { fetchProducts } from "../../app/store/services/products/reducers/product.slice";
import { getSnackList } from "../../app/store/services/snacks/reducers/snack.slice";
import { wrapper } from "../../app/store/store";

export default function Snacks () {
    const dispatch = useDispatch();
    const {fetchSnacksByFilter} = useFilter();
    const { product, productList } = useAppSelector(
        (state) => state.productReducer
    );
    const minPrice: number = useAppSelector((state) => state.snackReducer.minPrice);
    const maxPrice: number = useAppSelector((state) => state.snackReducer.maxPrice);
    const { closeFilterMenu, dropSnackList, resetProductFilters, setSearch, openModalNotFoundByFilter, closeModalNotFoundByFilter } = useActions();

    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.modalNotFoundByFilter
    );

    const handleApplyFilter = () => {
        fetchSnacksByFilter();
        closeFilterMenu();
    };

    const handleResetFilter = async () => {
        closeFilterMenu();
        await setSearch({q:''});
        await resetProductFilters();
        await dropSnackList();
        await dispatch(getSnackList({path: '/snacks/', params: { page: 0, limitPage }}));
    };

    return (
        <div className="page-container">
            <Menu
                callbackApplyFilter={handleApplyFilter}
                callbackResetFilter={handleResetFilter}
                filter={{minPrice, maxPrice, productType:'snacks'}}
                filterList={[]}
            />
            <ProductsList productType="snacks"/>
            <ResultNotFoundByFilter 
                openModalNotFoundByFilter={openModalNotFoundByFilter} 
                closeModalNotFoundByFilter={closeModalNotFoundByFilter} 
                isOpen={isOpen} 
            />
            {productList.length > 0 && !isEmptyObject(product) && (<SnackModal />)}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        await store.dispatch(
            fetchProducts("/snacks/getListByFilter/", {
                page: 0,
                limitPage,
                isActive: "true",
                sortField: "price",
                order: "ASC"
            })
        );
     
        return {
            props: {},
        };
    });
