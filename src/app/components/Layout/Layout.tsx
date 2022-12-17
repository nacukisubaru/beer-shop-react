import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { FC } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface ILayoutProps {
    children: any;
}

const useStyles = makeStyles({
    wrapper: {
        margin: '-8px'
    },
    childrenWrapper: {
        marginBottom: "50px"
    }
})

const Layout: FC<ILayoutProps> = ({ children }) => {
    const styles = useStyles();
    const router = useRouter();

    return (
        <>
            <div className={styles.wrapper}>
                {router.route.indexOf('/admin/') < 0 && <Header />}
                <div className={styles.childrenWrapper}>{children}</div>
                {router.route.indexOf('/admin/') < 0 &&  <Footer />}
            </div>
        </>
    );
}

export default Layout;