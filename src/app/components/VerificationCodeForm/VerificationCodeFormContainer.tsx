import { unwrapResult } from "@reduxjs/toolkit";
import { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { userApi } from "../../store/services/users/users.api";
import { verificationCodeApi } from "../../store/services/verification-code/verification-code.api";
import VerificationCodeFormView from "./VerificationCodeFormView";

interface VerificationCodeFormContainer {}

const VerificationCodeFormContainer: FC<VerificationCodeFormContainer> = () => {
   const {phone} = useAppSelector(state => state.verificationCodeReducer);
    const verificationCodeResp = verificationCodeApi.useSendCodeByCallQuery(phone);
    let verificationError: any = verificationCodeResp.error;
    if(verificationCodeResp.error) {
        verificationError = verificationError.data.message;
    }

    return <VerificationCodeFormView requestCode={verificationCodeResp.refetch} error={verificationError} />;
};

export default VerificationCodeFormContainer;
