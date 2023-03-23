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

interface IimageForText {
    url: string
}

interface IimageForTextData {
    data: IimageForText[]
}

interface IAboutUsData {
    imageForText: IimageForTextData, 
    imageForText2: IimageForTextData, 
    text: string, 
    text2: string, 
    title: string, 
    title2: string
}

interface IAboutUsProps {
    data: IAboutUsData
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
            <Menu
                filterList={[]}
                productType="beers"
            />
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
                imageForText: {data: []}, 
                imageForText2: {data: []}, 
                text: "", 
                text2: "", 
                title: "", 
                title2: ""
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
