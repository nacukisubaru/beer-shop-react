import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { FC } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface ILayoutProps {
    children: any;
}


const Layout: FC<ILayoutProps> = ({ children }) => {
    const router = useRouter();

    return (
        <>
            <div>
                {router.route.indexOf('/admin/') < 0 && <Header />}
                <div className="children-wrapper">{children}</div>
                {router.route.indexOf('/admin/') < 0 &&  <Footer />}
            </div>
        </>
    );
}

export default Layout;