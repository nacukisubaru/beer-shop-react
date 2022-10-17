import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ILogin } from "../../store/services/users/types/auth.types";
import { useDispatch } from "react-redux";
import { registrate } from "../../store/services/users/reducers/user.slice";
import RegistrationView from "./RegistrationView";

interface RegistrationContainerProps {}

const RegistrationContainer:FC<RegistrationContainerProps>  = () => {
    const dispatch = useDispatch();
    const regError = useAppSelector(state => state.userReducer.error);

    const registrateUser = async (post: ILogin) => {
        await dispatch(registrate(post));
    }

    return (
        <RegistrationView registrate={registrateUser} error={regError} />
    );
}

export default RegistrationContainer;