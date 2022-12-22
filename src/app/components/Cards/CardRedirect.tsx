import { Box, Button, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { ICard } from "../../types/card.types";
import styles from "./styles/cards.module.css";

interface IBox {
    width: string;
    height: string;
}

interface IImageProps {
    image: string;
    imageSettings: IBox;
}

export interface ISettingsCardRedirect {
    card: IBox;
    imageProps?: IImageProps;
}

export interface ILink {
    title: string;
    url: string;
}

interface ICardRedirect {
    settingsCardProps: ISettingsCardRedirect;
    linkProps: ILink;
}

const CardRedirect: FC<ICardRedirect> = ({ settingsCardProps, linkProps }) => {
    const { card, imageProps } = settingsCardProps;

    const useStyles = makeStyles({
        card: {
            width: card.width,
            height: card.height,
            margin: "10px",
            borderRadius: "15px",
            paddingTop: "36px",
            backgroundColor: "#b05326",
        },
        link: {
            display: "flex",
            justifyContent: "center",
            color: "white",
            textDecoration: "none",
        },
        cardContent: {
            paddingLeft: "10px",
            paddingRight: "10px",
        },
        cardImg: {
            marginLeft: "59px",
            marginTop: "50px",
            objectFit: "cover",
        },
    });

    const classes = useStyles();

    return (
        <>
            <Card className={classes.card}>
                <div className={classes.cardContent}>
                    {imageProps && (
                        <Image
                            className={classes.cardImg}
                            src={imageProps.image}
                            height={imageProps.imageSettings.height}
                            width={imageProps.imageSettings.width}
                        />
                    )}

                    <Link href={linkProps.url} className={classes.link}>
                        <Typography variant="body1">
                            {linkProps.title}
                        </Typography>
                    </Link>
                </div>
            </Card>
        </>
    );
};

export default CardRedirect;
