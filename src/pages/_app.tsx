import { FC } from "react";
import { Provider } from "react-redux";
import { store, wrapper } from "../app/store/store";

//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useBasket } from "../app/hooks/useBasket";
import { getUser } from "../app/store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Account from "./account";
import Beers from "./products/beers";
import Basket from "./basket";
import Snacks from "./products/snacks";
import MainAdmin from "./admin/main";
import BeerAdmin from "./admin/beer";
import SnacksAdmin from "./admin/snack";
import GradeAdmin from "./admin/grade";
import BrandAdmin from "./admin/brand";
import TypePackagingAdmin from "./admin/typePackaging";
import OrdersAdmin from "./admin/orders";
import Layout from "../app/components/Layout/Layout";

interface AppProps {
    Component: any;
    pageProps: any;
}
const App: FC<AppProps> = ({ Component, pageProps }) => {
    const { getBasket, getBasketByUser } = useBasket();
    const dispatch = useDispatch();
    useEffect(() => {
        const userId: any = localStorage.getItem("userId");
        const accessToken: string | null = localStorage.getItem("accessToken");
        if (userId) {
            if (accessToken) {
                dispatch(getUser(userId));
                getBasketByUser();
            }
        } else {
            getBasket();
        }
    }, []);

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
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
};

export default wrapper.withRedux(App);

//     return (
//         <div className="App">
//             <ThemeProvider theme={theme}>
//                 <BrowserRouter>
//                     <Routes>
//                         <Route path="/account" element={<Account />} />
//                         <Route path="/products/beers" element={<Beers />}></Route>
//                         <Route path="/products/snacks" element={<Snacks />}></Route>
//                         <Route path="/basket" element={<Basket />}></Route>
//                         <Route path="/admin" element={<MainAdmin />}></Route>
//                         <Route path="/admin/beers" element={<BeerAdmin />}></Route>
//                         <Route path="/admin/snacks" element={<SnacksAdmin />}></Route>
//                         <Route path="/admin/grades" element={<GradeAdmin />}></Route>
//                         <Route path="/admin/brands" element={<BrandAdmin />}></Route>
//                         <Route path="/admin/type-packaging" element={<TypePackagingAdmin />}></Route>
//                         <Route path="/admin/orders" element={<OrdersAdmin />}></Route>
//                     </Routes>
//                 </BrowserRouter>
//             </ThemeProvider>
//         </div>
//     );
// }

// export default App;
