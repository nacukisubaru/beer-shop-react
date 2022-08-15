import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFilter } from "../../../hooks/useFilter";
import { useProductMap } from "../../../hooks/useProductMap";
import { limitPage } from "../../../http/http.request.config";
import { getMinAndMaxPrice } from "../../../store/reducers/filter.products";
import { getSnackList } from "../../../store/services/snacks/reducers/snack.slice";
import CardList from "../../Cards/CardList";

interface SnacksListProps {}

const SnacksList: FC<SnacksListProps> = () => {
    const dispatch = useDispatch();
    const { page, status, total } = useAppSelector(
        (state) => state.snackReducer
    );
    const {snackList} = useAppSelector((state) => state.snackReducer);
    const {resetSnackPage, dropSnackList, resetFilters, getSnack, openSnack} = useActions();
    const snacks = useProductMap(snackList);
    const {fetchSnacks} = useFilter();

    useEffect(() => {
        const snackList = async () => {
            await resetSnackPage();
            await dropSnackList();
            await resetFilters();
            await dispatch(getSnackList({path: '/snacks/', params: {page: 0, limitPage}}));
        }

        snackList();
        dispatch(getMinAndMaxPrice());
    }, []);

    const showSnack = (id: number) => {
        getSnack({id});
        openSnack();
    }

    return (<>
       {snackList.length > 0 && (
                <>
                    <CardList
                        cardsList={snacks}
                        fetch={fetchSnacks}
                        page={page}
                        scrollList={status == 'resolved' ? true : false}
                        show={showSnack}
                    ></CardList>
                </>
            )}
    </>);
}

export default SnacksList;