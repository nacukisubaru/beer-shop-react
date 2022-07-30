import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/account/account";
import Beers from "./pages/products/beers";
import Basket from "./pages/basket/basket";
import Header from "./app/components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header />
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
