import RegistrationView from "./RegistrationView";
import React, { FC } from "react";
import { userApi } from "../../store/services/users/users.api";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ILogin } from "../../store/services/users/types/auth.types";

interface RegistrationContainerProps {}

const RegistrationContainer:FC<RegistrationContainerProps>  = () => {
    const [registrate] = userApi.useRegistrateMutation();
    const {addUserData, switchLoginForm} = useActions();
    const regError = useAppSelector(state => state.userReducer.error);

    const registrateUser = async (post: ILogin) => {
        const data = await registrate(post).unwrap();
        addUserData(data);  
    }

    return (
        <RegistrationView registrate={registrateUser} switchLoginForm={switchLoginForm} error={regError} />
    );
}

export default RegistrationContainer;