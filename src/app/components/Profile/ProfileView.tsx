import React, { FC } from "react";
import {
    Button
} from "@mui/material";
import { logout } from "../../store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";

const ProfileView: FC = () => {
    const dispatch = useDispatch();
    const {resetBasket} = useActions();
    const handleLogout = async () => {    
       await dispatch(logout());
       resetBasket();
       localStorage.clear();
    }

    return (<>

        <Button onClick={handleLogout}>Выйти</Button>
    </>);
}

export default ProfileView;
