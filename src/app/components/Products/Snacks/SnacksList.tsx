import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useFilter } from "../../../hooks/useFilter";
import { useProductMap } from "../../../hooks/useProductMap";
import { useSnackList } from "../../../hooks/useProducts";
import { limitPage } from "../../../http/http.request.config";
import { getSnackList } from "../../../store/services/snacks/reducers/snack.slice";
import CardList from "../../Cards/CardList";

interface SnacksListProps {}

const SnacksList: FC<SnacksListProps> = () => {
    const { page, status } = useAppSelector(
        (state) => state.snackReducer
    );
    const {snackList} = useAppSelector((state) => state.snackReducer);
    const {getSnack, openSnack} = useActions();
    const snacks = useProductMap(snackList);
    const {fetchSnacks} = useFilter();
    useSnackList();

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