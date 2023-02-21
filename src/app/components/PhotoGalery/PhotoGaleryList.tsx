import { FC } from "react";
import { ImageListItemBar } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
                    >
                        <img src={item.url}  />
                        <ImageListItemBar
                            title={item.title}
                            position="top"
                            style={{
                                background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default PhotoGaleryList;
