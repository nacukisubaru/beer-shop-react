import { FC } from "react";
import Header from "../Header/Header";

interface ILayoutProps {
    children: any;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default Layout;