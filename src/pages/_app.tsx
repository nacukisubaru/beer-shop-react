import { FC } from "react";
import { Provider } from "react-redux";
import { store, wrapper } from "../app/store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useBasket } from "../app/hooks/useBasket";
import { getUser } from "../app/store/services/users/reducers/user.slice";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../app/components/Layout/Layout";
import "../styles/global.css";

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