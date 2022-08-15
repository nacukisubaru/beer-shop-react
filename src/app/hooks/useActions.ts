import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import {userActions} from '../store/services/users/reducers/user.slice';
import { accountFormsActions } from "../store/reducers/account.form.slice";
import { basketActions } from "../store/services/basket/reducers/basket.slice";
import { beerActions } from "../store/services/beers/reducers/beer.slice";
import { drawerMenuActions } from "../store/reducers/drawer.menu.slice";
import { filterProductsActions } from "../store/reducers/filter.products";
import { snackActions } from "../store/services/snacks/reducers/snack.slice";

const allActions = {
    ...userActions,
    ...accountFormsActions,
    ...basketActions,
    ...beerActions,
    ...drawerMenuActions,
    ...filterProductsActions,
    ...snackActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
}