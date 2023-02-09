import React, { FC } from "react";
import RegistrationView from "./RegistrationView";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuthorizationUser } from "../../hooks/useAuthorizationUser";
import { useActions } from "../../hooks/useActions";

interface RegistrationContainerProps {
    consentText?: string
}

const RegistrationContainer: FC<RegistrationContainerProps> = ({consentText}) => {
    const regError = useAppSelector((state) => state.userReducer.error);
    const { phone, password, retryPassword } = useAppSelector(
        (state) => state.verificationCodeReducer
    );
    const { registrateUser } = useAuthorizationUser();
    const { setRegFields } = useActions();

    return (
        <RegistrationView
            registrate={registrateUser}
            setRegistrationFields={setRegFields}
            defaultValues={{ phone, password, retryPassword }}
            error={regError}
            consentText={consentText}
        />
    );
};

export default RegistrationContainer;
