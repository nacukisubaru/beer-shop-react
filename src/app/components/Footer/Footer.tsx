import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import styles from "./styles/footer.module.css";

const Footer: FC = () => {
    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ height: "400px" }}>
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
                                        <Typography variant="body2">
                                            <Link
                                                className={styles.link}
                                               
                                                href="/"
                                            >
                                                Как сделать заказ
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                               className={styles.link}
                                                href="/"
                                            >
                                                Правила продажи
                                            </Link>
                                        </Typography>
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
                                                href="/"
                                            >
                                                О нас
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                               className={styles.link}
                                                href="/"
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
                                        <Typography variant="body2">
                                            <Link
                                                className={styles.link}
                                                href="https://vk.com/id474817801"
                                                target="_blank"
                                            >
                                                ВКонтакте
                                            </Link>
                                        </Typography>
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
                                                href="tel:+7 920 899 77 72"
                                            >
                                                +7 920 899 77 72
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={styles.link}
                                                href="https://2gis.ru/kaluga/firm/70000001036699976"
                                                target="_blank"
                                            > 
                                                ул. Братьев Луканиных, 7, Калуга
                                            </Link>
                                        </Typography>
                                    </Container>
                                </div>
                            </Container>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        </>
    );
};
//export default dynamic(() => Promise.resolve(Footer), { ssr: false })
export default Footer;