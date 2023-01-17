import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { makeStyles } from "@mui/styles";
import { ImageListItemBar } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,

        transform: "translateZ(0)",
    },
    titleBar: {
        background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
        color: "white",
    },
}));

export default function PhotoGaleryList() {
    const classes = useStyles();
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <ImageList
                rowHeight={200}
                gap={1}
                style={{
                    width: 600,
                    height: 550,

                    transform: "translateZ(0)",
                }}
            >
                {itemData.map((item) => (
                    <ImageListItem
                        key={item.img}
                        cols={item.featured ? 2 : 1}
                        rows={item.featured ? 2 : 1}
                    >
                        <img src={item.img} alt={item.title} />
                        <ImageListItemBar
                            title={item.title}
                            position="top"
                            className={classes.titleBar}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

const itemData = [
    {
        img: "http://localhost:5000/images/0oByG2iiNLA.png",
        title: "Бар",
        rows: 2,
        cols: 2,
        featured: true
    },
    {
        img: "http://localhost:5000/images/beergrad-photo1.png",
        title: "Вход в пивбар",
    },
    {
        img: "http://localhost:5000/images/beergrad-photo2.jpg",
        title: "Пивградъ",
    },
    {
        img: "http://localhost:5000/images/beergrad-photo3.jpg",
        title: "Пиво",
    },
    {
        img: "http://localhost:5000/images/beergrad-photo4.jpg",
        title: "Пиво",
    },
    {
      img: "http://localhost:5000/images/beergrad-photo5.jpg",
      title: "Пиво",
    }
];
