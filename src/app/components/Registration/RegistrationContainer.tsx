import React, { FC } from "react";
import RegistrationView from "./RegistrationView";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";

interface RegistrationContainerProps {}

const RegistrationContainer:FC<RegistrationContainerProps>  = () => {
    const regError = useAppSelector(state => state.userReducer.error);
    const {registrateUser} = useAuthorizationUser();

    return (
        <RegistrationView registrate={registrateUser} error={regError} />
    );
}

export default RegistrationContainer;