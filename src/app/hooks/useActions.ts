import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import {userActions} from '../store/services/users/reducers/user.slice';
import { accountFormsActions } from "../store/reducers/account.form.slice";

const allActions = {
    ...userActions,
    ...accountFormsActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
}