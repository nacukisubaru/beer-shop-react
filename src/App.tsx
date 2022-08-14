import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/account/account";
import Beers from "./pages/products/beers";
import Basket from "./pages/basket/basket";
import { useEffect } from "react";
import { useBasket } from "./app/hooks/useBasket";
import { useActions } from "./app/hooks/useActions";
import { getObjStorage, getValStorage } from "./app/helpers/storageHelper";

function App() {
    const {getBasket, getBasketByUser} = useBasket();  
    const {addUserData} = useActions();

    useEffect(()=>{
        const user: any = getObjStorage("user");
        const accessToken: string | null = getValStorage("accessToken");

        if(user) {
            if(accessToken) {
                addUserData({
                    accessToken,
                    user,
                    authError: {
                        status: 0,
                        message: ""
                    },
                    status: "",
                    error: ""
                });

                getBasketByUser(user.id);
            }
        } else {
            getBasket();
        }
    },[]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/account" element={<Account />} />
                    <Route path="/products/beers" element={<Beers />}></Route>
                    <Route path="/basket" element={<Basket />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
