import React from "react";
import LoginContainer from "../../app/components/Login/LoginContainer";
import RegistrationContainer from "../../app/components/Registration/RegistrationContainer";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import Header from "../../app/components/Header/Header";
import Menu from "../../app/components/Drawer/Menu/Menu";
import ProfileView from "../../app/components/Profile/ProfileView";

export default function Account() {
    const accountForm = useAppSelector((state) => state.accountFormsReducer);
    const {isAuth} = useAppSelector(state => state.userReducer);

    return (
        <>
            <Header />
            <Menu
               callbackApplyFilter={()=>{}} 
               callbackResetFilter={()=>{}}
               filter={{minPrice: 0, maxPrice: 0, productType: ''}}
               filterList={[]}
            />
            {accountForm.isLoginForm && !isAuth  ? (
                <LoginContainer />
            ) : accountForm.isRegistrationForm && !isAuth  ? (
                <RegistrationContainer />
            ) : (
               <ProfileView />
            )}
        </>
    );
}
