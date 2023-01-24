import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import {userActions} from '../store/services/users/reducers/user.slice';
import { accountFormsActions } from "../store/reducers/account.form.slice";
import { basketActions } from "../store/services/basket/reducers/basket.slice";
import { beerActions } from "../store/services/beers/reducers/beer.slice";
import { drawerMenuActions } from "../store/reducers/drawer.menu.slice";
import { filterProductsActions } from "../store/reducers/filter.products";
import { snackActions } from "../store/services/snacks/reducers/snack.slice";
import { notFoundActions } from "../store/reducers/notFound.slice";
import { verificationCodeActions } from "../store/services/verification-code/reducers/verification-code.slice";
import { orderActions } from "../store/services/order/reducers/order.slice";
import { contentActions } from "../store/reducers/content.slice";
import { productActions } from "../store/services/products/reducers/product.slice";
import { headerActions } from "../store/reducers/header.slice";

const allActions = {
    ...userActions,
    ...accountFormsActions,
    ...basketActions,
    ...beerActions,
    ...drawerMenuActions,
    ...filterProductsActions,
    ...snackActions,
    ...notFoundActions,
    ...verificationCodeActions,
    ...orderActions,
    ...contentActions,
    ...productActions,
    ...headerActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
}