import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFilter } from "../../../hooks/useFilter";
import { useProductMap } from "../../../hooks/useProductMap";
import { useSnackList } from "../../../hooks/useProducts";
import { limitPage } from "../../../http/http.request.config";
import { getSnackList } from "../../../store/services/snacks/reducers/snack.slice";
import { snackApi } from "../../../store/services/snacks/snack.api";
import CardList from "../../Cards/CardList";
import InputSearch from "../../Search/InputSearch";
import SortPanel from "../../SortPanel/SortPanel";

interface SnacksListProps {}

const SnacksList: FC<SnacksListProps> = () => {
    const { page, status } = useAppSelector((state) => state.snackReducer);
    const { snackList, snack } = useAppSelector((state) => state.snackReducer);
    const {q} = useAppSelector((state) => state.filterProductsReducer);
    const { getSnack, openSnack } = useActions();
    const snacks = useProductMap(snackList, false);
    const { fetchSnacks, fetchSnacksWithSort, snacksSearchByName, resetListAndFetchSnacks, fetchSnacksBySearch, fetchSnacksBySearchWithSort } = useFilter();
    const [addShowSnack] = snackApi.useAddShowSnackMutation();
    useSnackList();

    const showSnack = (id: number) => {
        getSnack({ id });
        openSnack();
        addShowSnack(id);
    };

    return (
        <>
            <InputSearch search={snacksSearchByName} reset={resetListAndFetchSnacks} />
            <SortPanel fetchData={q ? fetchSnacksBySearchWithSort : fetchSnacksWithSort}></SortPanel>
            {snackList.length > 0 && (
                <>
                    <CardList
                        cardsList={snacks}
                        fetch={q ? fetchSnacksBySearch: fetchSnacks}
                        page={page}
                        scrollList={status == "resolved" ? true : false}
                        show={showSnack}
                    ></CardList>
                </>
            )}
        </>
    );
};

export default SnacksList;
