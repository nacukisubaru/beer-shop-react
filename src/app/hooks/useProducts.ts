import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getBeerList, getMinAndMaxFortressBeers, getMinAndMaxPriceBeers, getMinAndMaxVolumeBeers } from "../store/services/beers/reducers/beer.slice";
import { getMinAndMaxPriceSnacks, getSnackList } from "../store/services/snacks/reducers/snack.slice";
import { useFilter } from "./useFilter";

export const useBeerList = () => {
    const dispatch = useDispatch();
    const {fetchBeers} = useFilter();
    
    useEffect(() => {
        fetchBeers(0, "price", "ASC");
        dispatch(getMinAndMaxPriceBeers());
        dispatch(getMinAndMaxVolumeBeers());
        dispatch(getMinAndMaxFortressBeers());
    }, [
        dispatch,
    ]);
}

export const useSnackList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const snackList = async () => {
            await dispatch(getSnackList({ path: '/snacks/', params: { page: 0, limitPage } }));
        }

        snackList();
        dispatch(getMinAndMaxPriceSnacks());
    }, [dispatch]);
}