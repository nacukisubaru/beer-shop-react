import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "../app/components/Drawer/Menu/Menu";
import PhotoGaleryList from "../app/components/PhotoGalery/PhotoGaleryList";
import banner from "../assets/images/banner.jpg";

const useStyles = makeStyles({
    bannerImage: {
        backgroundSize: "contain",
        marginTop: "-43px",
        zIndex: "-1",
        position: "absolute",
        height: "80%",
        width: "100%",
        inset: "0px",
        objectFit: "cover",
    },
    banner: {
        width: "58%",
        paddingTop: "73px",
        marginLeft: "82px",
        height: "500px",
        "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)":
            {
                paddingTop: 0,
            },
    },
    bannerText: {
        fontFamily: "Kurale",
        color: "white",
        textShadow: "1px 1px 1px #000",
        "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)":
            {
                fontSize: "50px",
            },
    },
    bannerText2: {
        fontFamily: "Kurale",
        color: "white",
        textShadow: "1px 1px 1px #000",
        marginBottom: "17px",
        "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)":
            {
                fontSize: "50px",
            },
    },
    bannerUnderText: {
        fontFamily: "Montserrat",
        color: "white",
        width: "50%",
        marginBottom: "17px",
        "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)":
            {
                fontSize: "25px",
            },
    },
    bannerButton: {
        borderRadius: "19px",
    },
    text: { fontFamily: "Kurale", color:"#ac5725"}
});

const Home = () => {
    const router = useRouter();
    const classes = useStyles();
    return (
        <>
            <div className="page-container">
                <Menu
                    callbackApplyFilter={() => {}}
                    callbackResetFilter={() => {}}
                    filter={{ minPrice: 0, maxPrice: 0, productType: "" }}
                    filterList={[]}
                />
                <div>
                    <div className={classes.banner}>
                        <Typography className={classes.bannerText} variant="h2">
                            Там где твои друзья
                        </Typography>
                        <Typography
                            className={classes.bannerText2}
                            variant="h2"
                        >
                            Пивградъ
                        </Typography>
                        <Typography
                            className={classes.bannerUnderText}
                            variant="h4"
                        >
                            попробуй яркий вкус, свежего пива
                        </Typography>
                    
                        <Button
                            className={classes.bannerButton}
                            variant="contained"
                            onClick={()=>{
                                router.replace("/products/beers");
                            }}
                        >
                            Попробовать
                        </Button>
                    </div>
                    <Image
                        className={classes.bannerImage}
                        src={banner}
                        objectFit="cover"
                        quality={100}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography className={classes.text} variant="h2">Наш бар</Typography>
                </div>
                <PhotoGaleryList />
            </div>
        </>
    );
};

export default Home;
