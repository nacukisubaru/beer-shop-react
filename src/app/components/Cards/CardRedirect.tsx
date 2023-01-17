import { Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
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

    return (
        <>
            <Card
                className={styles.card}
                style={{
                    width: card.width,
                    height: card.height,
                    backgroundColor: "#b05326",
                }}
            >
                <div className={styles.cardContent}>
                    {imageProps && (
                        <Image
                            style={{
                                marginLeft: "59px",
                                marginTop: "50px",
                                objectFit: "cover",
                            }}
                            src={imageProps.image}
                            height={imageProps.imageSettings.height}
                            width={imageProps.imageSettings.width}
                        />
                    )}

                    <Link
                        href={linkProps.url}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
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
