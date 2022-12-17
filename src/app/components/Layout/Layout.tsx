import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { FC } from "react";
import Header from "../Header/Header";

interface ILayoutProps {
    children: any;
}

const useStyles = makeStyles({
    wrapper: {
        margin: '-8px'
    }
})

const Layout: FC<ILayoutProps> = ({ children }) => {
    const styles = useStyles();
    const router = useRouter();
    console.log(router.route.indexOf('/admin/') );
    return (
        <>
            <div className={styles.wrapper}>
                {router.route.indexOf('/admin/') < 0 && <Header />}
                {children}
            </div>
        </>
    );
}

export default Layout;