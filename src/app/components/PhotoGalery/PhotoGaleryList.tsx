import { FC } from "react";
import { makeStyles } from "@mui/styles";
import { ImageListItemBar } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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

interface CustomData {
    rows?: any,
    cols?: any,
    featured?: any
}
interface ItemList {
    url: string,
    title: string,
    customData: CustomData
}
interface PhotoGaleryListProps {
    itemsList: ItemList[]
}

const PhotoGaleryList: FC<PhotoGaleryListProps> = ({itemsList}) => {
    const classes = useStyles();
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <ImageList
                gap={1}
                style={{
                    width: 850,
                    height: 550,
                    transform: "translateZ(0)",
                }}
            >
                {itemsList.map((item) => (
                    <ImageListItem
                        key={item.url}
                        // cols={item.customData.featured ? 2 : 1}
                        // rows={item.customData.featured ? 2 : 1}
                    >
                        <img src={item.url}  />
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

export default PhotoGaleryList;
