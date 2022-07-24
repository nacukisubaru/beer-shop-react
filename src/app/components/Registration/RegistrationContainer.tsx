import RegistrationView from "./RegistrationView";
import React, { FC } from "react";
import { userApi } from "../../store/services/users/users.api";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ILogin } from "../../store/services/users/types/auth.types";

interface RegistrationContainerProps {}

const RegistrationContainer:FC<RegistrationContainerProps>  = () => {
    const [registrate] = userApi.useRegistrateMutation();
    const {addUserData, switchLoginForm, addAuthError, resetAuthError} = useActions();
    const regError = useAppSelector(state => state.userReducer.authError);

    const registrateUser = async (post: ILogin) => {
        try {
            const data = await registrate(post).unwrap();
            addUserData(data);
            resetAuthError();
        } catch(e: any) {
            addAuthError({status: e.status, message: e.data.message});
        }
    }

    return (
        <RegistrationView registrate={registrateUser} switchLoginForm={switchLoginForm} error={regError} />
    );
}

export default RegistrationContainer;