import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";
import Head from "next/head";
import Menu from "../app/components/Drawer/Menu/Menu";
import { host } from "../app/http/http.request.config";

interface IimageForText {
    url: string;
}

interface IimageForTextData {
    data: IimageForText[];
}

interface IAboutUsData {
    imageForText: IimageForTextData;
    imageForText2: IimageForTextData;
    text: string;
    text2: string;
    title: string;
    title2: string;
}

interface IAboutUsProps {
    data: IAboutUsData;
}

const AboutUs: FC<IAboutUsProps> = ({ data }) => {
    const { imageForText, imageForText2, text, text2, title, title2 } = data;
    const [isOpenText, openText] = useState(false);

    const handleOpenText = () => {
        if (isOpenText) {
            openText(false);
        } else {
            openText(true);
        }
    };

    return (
        <>
            <Head>
                <title>О нас | Пивградъ</title>
            </Head>
            <Menu filterList={[]} productType="beers" />
            <div style={{ margin: "13px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {text && (
                        <>
                            <div className="description-block">
                                {title && (
                                    <Typography
                                        className="main-page-text"
                                        variant="h4"
                                        style={{
                                            marginBottom: "15px",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                )}
                                <Typography>{text}</Typography>
                            </div>
                        </>
                    )}
                    {imageForText && (
                        <Box
                            className="image-for-description"
                            sx={{
                                background: `url(${imageForText.data[0].url}) center center no-repeat`,
                                backgroundSize: "cover"
                            }}
                        ></Box>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {imageForText2 && (
                        <Box
                            className="image-for-description"
                            sx={{
                                background: `url(${imageForText2.data[0].url}) center center no-repeat`,
                                backgroundSize: "cover"
                            }}
                        ></Box>
                    )}
                    {text2 && (
                        <>
                            <div className="description-block">
                                {title2 && (
                                    <Typography
                                        className="main-page-text"
                                        variant="h4"
                                        style={{
                                            marginBottom: "15px",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {title2}
                                    </Typography>
                                )}
                                <Typography
                                    className={
                                        isOpenText === false
                                            ? "truncate-row truncate-row-5"
                                            : ""
                                    }
                                    style={{ marginBottom: "15px" }}
                                >
                                    {text2}
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        onClick={handleOpenText}
                                        variant="outlined"
                                    >
                                        Подробнее
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AboutUs;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: IAboutUsProps = {
            data: {
                imageForText: {
                    data: [{ url: host + "/assets/beergrad-photo4.jpg" }],
                },
                imageForText2: {
                    data: [{ url: host + "/assets/beergrad-photo5.jpg" }],
                },
                text:
                    "Пивбар, расположенный в Калуге, Россия, является популярным местом" +
                    "встречи как местных жителей, так и туристов. Этот бар, известный своим широким выбором пива" +
                    "и восхитительными закусками, стал популярным местом для тех, кто хочет расслабиться с друзьями или семьей." +
                    "В дополнение к своему вкусному меню пивбар также предлагает широкий выбор рыбных блюд, что делает его отличным вариантом для любителей морепродуктов.",
                text2:
                    "Пиво – это один из самых популярных напитков в мире. И нет ничего лучше, чем насладиться свежим пивом в компании друзей в пивбаре. " +
                    "В пивбаре можно не только попробовать различные сорта пива, но и насладиться вкусными снеками. Ведь что может быть лучше, чем сочетание свежего пива и аппетитных закусок? " +
                    "Когда дело доходит до наслаждения холодным пивом, многие люди считают, что закуска является идеальным сопровождением. " +
                    "Будь то тарелка соленого арахиса или хрустящий крендель, сочетание пива и закусок может стать идеальным сочетанием. " +
                    "В нашем пивбаре всегда подают отличные закуски и в нем царит приятная атмосфера.",
                title: "Пивградъ",
                title2: "Лучший бар в Калуге",
            },
        };

        const aboutUsData = await cmsQueryExecute(
            "/api/about-us-page?populate=*"
        );

        if (aboutUsData) {
            props.data = aboutUsData;
        }

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        return {
            props,
        };
    });
