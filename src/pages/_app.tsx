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
                main: "#b05326",
            },
            text: {
                primary: "#000000",
                secondary: "#757575",
            },
        },
        typography: {
            fontFamily: [
                "Montserrat",
                "sans-serif",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
            ].join(","),
            h2: {
                "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)":
                    {
                        fontSize: "40px",
                    },
                "@media screen and (max-width: 385px) and (min-width: 383px)": {
                    fontSize: "40px",
                },
                "@media screen and (max-width: 642px) and (min-width: 640px)": {
                    fontSize: "40px",
                },
                "@media screen and (max-width: 321px) and (min-width: 319px)": {
                    fontSize: "40px",
                },
                "@media screen and (max-width: 481px) and (min-width: 479px)": {
                    fontSize: "40px",
                },
                "@media screen and (max-width: 321px) and (min-width: 319px)": {
                    fontSize: "40px",
                },
                "@media screen and (max-width: 481px) and (min-width: 479px)": {
                    fontSize: "40px",
                },
                "@media screen and (min-width: 500px) and (max-width: 720px)": {
                    fontSize: "40px",
                },
                "@media screen and (min-width: 200px) and (max-width: 653px)": {
                    fontSize: "40px",
                },
                "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2)":
                    {
                        fontSize: "40px",
                    },
                "@media only screen and (min-device-width: 320px) and (max-device-width: 533px)":
                    {
                        fontSize: "40px",
                    },
            },
            h4: {
                "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)":
                    {
                        fontSize: "25px",
                    },
                "@media screen and (max-width: 385px) and (min-width: 383px)": {
                    fontSize: "25px",
                },
                "@media screen and (max-width: 642px) and (min-width: 640px)": {
                    fontSize: "25px",
                },
                "@media screen and (max-width: 321px) and (min-width: 319px)": {
                    fontSize: "25px",
                },
                "@media screen and (max-width: 481px) and (min-width: 479px)": {
                    fontSize: "25px",
                },
                "@media screen and (max-width: 321px) and (min-width: 319px)": {
                    fontSize: "25px",
                },
                "@media screen and (max-width: 481px) and (min-width: 479px)": {
                    fontSize: "25px",
                },
                "@media screen and (min-width: 500px) and (max-width: 720px)": {
                    fontSize: "25px",
                },
                "@media screen and (min-width: 200px) and (max-width: 653px)": {
                    fontSize: "25px",
                },
                "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2)":
                    {
                        fontSize: "25px",
                    },
                "@media only screen and (min-device-width: 320px) and (max-device-width: 533px)":
                    {
                        fontSize: "25px",
                    },
            },
            button: {
                fontWeight: "bold",
            },
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
