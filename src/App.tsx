import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/account/account";
import Beers from "./pages/products/beers";
import Basket from "./pages/basket/basket";
import { useEffect } from "react";
import { useBasket } from "./app/hooks/useBasket";
import { getUser } from "./app/store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import Snacks from "./pages/products/snacks";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainAdmin from "./pages/admin/main";
import BeerAdmin from "./pages/admin/content/products/beer";
import SnacksAdmin from "./pages/admin/content/products/snack";
import GradeAdmin from "./pages/admin/content/additional/grade";
import BrandAdmin from "./pages/admin/content/additional/brand";

function App() {
    const {getBasket, getBasketByUser} = useBasket();  
    const dispatch = useDispatch();

    useEffect(()=>{
        const userId: any = localStorage.getItem("userId");
        const accessToken: string | null = localStorage.getItem("accessToken");
        if(userId) {
            if(accessToken) {
                dispatch(getUser(userId));
                getBasketByUser();
            }
        } else {
            getBasket();
        }
    },[]);
       
    const theme = createTheme({
        palette: {
            primary: {
                main: '#b05326'
            },
            text: {
                primary: '#000000',
                secondary: '#757575',
                
            }
        },
        typography: {
            fontFamily: [
                'Montserrat',
                'sans-serif',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif'
            ].join(','),
            
            button: {
                fontWeight: 'bold'
            }
        },
    });

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/account" element={<Account />} />
                        <Route path="/products/beers" element={<Beers />}></Route>
                        <Route path="/products/snacks" element={<Snacks />}></Route>
                        <Route path="/basket" element={<Basket />}></Route>
                        <Route path="/admin" element={<MainAdmin />}></Route>
                        <Route path="/admin/beers" element={<BeerAdmin />}></Route>
                        <Route path="/admin/snacks" element={<SnacksAdmin />}></Route>
                        <Route path="/admin/grades" element={<GradeAdmin />}></Route>
                        <Route path="/admin/brands" element={<BrandAdmin />}></Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
