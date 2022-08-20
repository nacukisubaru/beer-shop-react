import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getMinAndMaxPrice } from "../store/reducers/filter.products";
import { getBeerList } from "../store/services/beers/reducers/beer.slice";
import { getSnackList } from "../store/services/snacks/reducers/snack.slice";
import { useActions } from "./useActions";

export const useBeerList = () => {
    const { dropBeerList, resetFilters, resetBeerPage } = useActions();
    const dispatch = useDispatch();

    useEffect(() => {
        const beerList = async () => {
            await resetBeerPage();
            await dropBeerList();
            await resetFilters();
            await dispatch(getBeerList({path: '/beers/', params: {page: 0, limitPage}}));
        }
        beerList();
        dispatch(getMinAndMaxPrice());
    }, []);
}

export const useSnackList = () => {
    const {resetSnackPage, dropSnackList, resetFilters} = useActions();
    const dispatch = useDispatch();

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
}