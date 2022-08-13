import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/account/account";
import Beers from "./pages/products/beers";
import Basket from "./pages/basket/basket";
import { useEffect } from "react";
import { useBasket } from "./app/hooks/useBasket";
import { useActions } from "./app/hooks/useActions";

function App() {
    const {getBasket, getBasketByUser} = useBasket();  
    const {addUserData} = useActions();

    useEffect(()=>{
        const user: any = localStorage.getItem("user");
        const accessToken: string | null = localStorage.getItem("accessToken");

        if(user) {
            if(accessToken) {
                const userParse: any = JSON.parse(user);
                addUserData({
                    accessToken,
                    user: userParse,
                    authError: {
                        status: 0,
                        message: ""
                    },
                    status: "",
                    error: ""
                });

                getBasketByUser(userParse.id);
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
