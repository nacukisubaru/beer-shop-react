import React, { FC } from "react";
import RegistrationView from "./RegistrationView";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import { useActions } from "../../hooks/useActions";

interface RegistrationContainerProps {}

const RegistrationContainer: FC<RegistrationContainerProps> = () => {
    const regError = useAppSelector((state) => state.userReducer.error);
    const { phone, email, password, retryPassword } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const { registrateUser } = useAuthorizationUser();
    const { setRegFields } = useActions();

    return (
        <RegistrationView
            registrate={registrateUser}
            setRegistrationFields={setRegFields}
            defaultValues={{ phone, email, password, retryPassword }}
            error={regError}
        />
    );
};

export default RegistrationContainer;
