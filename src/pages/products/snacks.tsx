import { GetServerSideProps } from "next";
import { isEmptyObject } from "../../app/helpers/typesHelper";
import { useActions } from "../../app/hooks/useActions";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { limitPage } from "../../app/http/http.request.config";
import { fetchProducts } from "../../app/store/services/products/reducers/product.slice";
import { wrapper } from "../../app/store/store";
import Menu from "../../app/components/Drawer/Menu/Menu";
import ResultNotFoundByFilter from "../../app/components/Modals/Messages/ResultNotFoundByFilter";
import SnackModal from "../../app/components/Modals/Products/SnackModal";
import ProductsList from "../../app/components/Products/ProductsList";

export default function Snacks () {
    const { product, productList } = useAppSelector(
        (state) => state.productReducer
    );
    const { openModalNotFoundByFilter, closeModalNotFoundByFilter } = useActions();
    const isOpen = useAppSelector(
        (state) => state.notFoundReducer.modalNotFoundByFilter
    );

    return (
        <div className="page-container">
            <Menu
                productType='snacks'
                filterList={[]}
            />
            <ProductsList 
                productType="snacks" 
                showTools={true} 
                loadingByScroll={true}
                settingsCardProps={{
                    card:{
                        width: "300px",
                        height: "390px"
                    },
                    button: {width: "279px", height: "30px"},
                    titleSize: "18px",
                    imageHeight: "200px",
                    priceSize: "20px"
                }}
            />
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
