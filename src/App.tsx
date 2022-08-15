import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/account/account";
import Beers from "./pages/products/beers";
import Basket from "./pages/basket/basket";
import { useEffect } from "react";
import { useBasket } from "./app/hooks/useBasket";
import { useActions } from "./app/hooks/useActions";
import { getUser } from "./app/store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";

function App() {
    const {getBasket, getBasketByUser} = useBasket();  
    const dispatch = useDispatch();

    useEffect(()=>{
        const userId: any = localStorage.getItem("userId");
        const accessToken: string | null = localStorage.getItem("accessToken");
        if(userId) {
            if(accessToken) {
                dispatch(getUser(userId));
                getBasketByUser(userId);
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
