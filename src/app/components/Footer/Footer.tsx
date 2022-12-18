import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";
import Link from "next/link";

const useStyles = makeStyles({
    footerContent: {
        display: "flex",
        justifyContent: "space-evenly",
    },
    footerWrapper: {
        paddingTop: "40px",
    },
    titleColumn: {
        fontWeight: "bold",
    },
    link: {
        textDecoration: "none",
        color: "white",
    },
});

const Footer: FC = () => {
    const classes = useStyles();
    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ height: "200px" }}>
                        <Toolbar>
                            <Container className={classes.footerWrapper}>
                                <div className={classes.footerContent}>
                                    <Container>
                                        <Typography
                                            className={classes.titleColumn}
                                            variant="h6"
                                        >
                                            Покупателям
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="/"
                                            >
                                                Как сделать заказ
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="/"
                                            >
                                                Правила продажи
                                            </Link>
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography
                                            className={classes.titleColumn}
                                            variant="h6"
                                        >
                                            Компания
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="/"
                                            >
                                                О нас
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="/"
                                            >
                                                Контакты
                                            </Link>
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography
                                            className={classes.titleColumn}
                                            variant="h6"
                                        >
                                            Разделы
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="/products/beers"
                                            >
                                                Пиво
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="/products/snacks"
                                            >
                                                Снеки
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="/"
                                            >
                                                Рыба
                                            </Link>
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography
                                            className={classes.titleColumn}
                                            variant="h6"
                                        >
                                            Мы в соцсетях
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="https://vk.com/id474817801"
                                                target="_blank"
                                            >
                                                ВКонтакте
                                            </Link>
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography
                                            className={classes.titleColumn}
                                            variant="h6"
                                        >
                                            Связяться
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
                                                href="tel:+7 920 899 77 72"
                                            >
                                                +7 920 899 77 72
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Link
                                                className={classes.link}
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

export default Footer;