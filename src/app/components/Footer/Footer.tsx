import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Link from "next/link";
import styles from "./styles/footer.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";

const Footer: FC = () => {
    const {
        phone,
        address,
        linkForAddress,
        socialNetworksList,
        articlesList
    } = useAppSelector((state) => state.headerReducer);
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Container 
                        className={styles.footerWrapper}
                        >
                            <div 
                            className={styles.footerContent}
                            >
                                <Container>
                                    <Typography
                                        className={styles.titleColumn}
                                        variant="h6"
                                    >
                                        Покупателям
                                    </Typography>
                                    { articlesList.map(article => {
                                        return (
                                            <Typography variant="body2">
                                                <Link
                                                    className={styles.link}
                                                    href={"/article-for-customers?id="+article.id}
                                                >
                                                    {article.articleName}
                                                </Link>
                                            </Typography>
                                        );
                                    })}
                                </Container>
                                <Container>
                                    <Typography
                                        className={styles.titleColumn}
                                        variant="h6"
                                    >
                                        Компания
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link
                                            className={styles.link}
                                            href="/about-us"
                                        >
                                            О нас
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link
                                            className={styles.link}
                                            href="/contacts"
                                        >
                                            Контакты
                                        </Link>
                                    </Typography>
                                </Container>
                                <Container>
                                    <Typography
                                        className={styles.titleColumn}
                                        variant="h6"
                                    >
                                        Разделы
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link
                                            className={styles.link}
                                            href="/products/beers"
                                        >
                                            Пиво
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link
                                            className={styles.link}
                                            href="/products/snacks"
                                        >
                                            Снеки
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link
                                            className={styles.link}
                                            href="/"
                                        >
                                            Рыба
                                        </Link>
                                    </Typography>
                                </Container>
                                <Container>
                                    <Typography
                                        className={styles.titleColumn}
                                        variant="h6"
                                    >
                                        Мы в соцсетях
                                    </Typography>
                                    { socialNetworksList.length > 0 && socialNetworksList.map(item => {
                                        return (
                                            <Typography variant="body2">
                                                <Link
                                                    className={styles.link}
                                                    href={item.link}
                                                    target="_blank"
                                                >
                                                    {item.name}
                                                </Link>
                                            </Typography>
                                        )
                                    })}
                                    
                                </Container>
                                <Container>
                                    <Typography
                                        className={styles.titleColumn}
                                        variant="h6"
                                    >
                                        Связяться
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link
                                            className={styles.link}
                                            href={"tel:"+phone}
                                        >
                                            {phone}
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link
                                            className={styles.link}
                                            href={linkForAddress}
                                            target="_blank"
                                        > 
                                            {address}
                                        </Link>
                                    </Typography>
                                </Container>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Footer;