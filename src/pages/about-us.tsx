import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import Menu from "../app/components/Drawer/Menu/Menu";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";

const AboutUs: FC = ({ data }) => {
    const { imageForText, imageForText2, text, text2, title, title2 } = data;
    const [isOpenText, openText] = useState(false);

    const handleOpenText = () => {
        if (isOpenText) {
            openText(false);
        } else {
            openText(true);
        }
    }

    return (
        <>
            <Menu
                callbackApplyFilter={() => {}}
                callbackResetFilter={() => {}}
                filter={{ minPrice: 0, maxPrice: 0, productType: "" }}
                filterList={[]}
            />
            <div style={{ margin: "13px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {text && (
                        <>
                            <div className="description-block">
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
                                <Typography className={isOpenText === false ? "truncate-row truncate-row-5": ""} style={{ marginBottom: "15px"}}>{text2}</Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button onClick={handleOpenText} variant="outlined">
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
        const props: any = {
            data: {},
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
