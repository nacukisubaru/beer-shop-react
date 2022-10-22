import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { limitPage } from "../http/http.request.config";
import { getBeerList, getMinAndMaxFortressBeers, getMinAndMaxPriceBeers, getMinAndMaxVolumeBeers } from "../store/services/beers/reducers/beer.slice";
import { getMinAndMaxPriceSnacks, getSnackList } from "../store/services/snacks/reducers/snack.slice";

export const useBeerList = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const beerList = async () => {
            await dispatch(getBeerList({ path: '/beers/', params: { page: 0, limitPage } }));
        }

        beerList();
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