import { makeStyles } from "@mui/styles";
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
    return (
        <>
            <div className={styles.wrapper}>        
                <Header />
                {children}
            </div>
        </>
    );
}

export default Layout;