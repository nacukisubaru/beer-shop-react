import { FC } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import "../css/style.css";

interface IListInfoItem {
    key: string,
    value: string
}

interface IProductContent {
    listInfo: IListInfoItem[],
    description: string,
    image: string,
}

const ProductContent: FC<IProductContent> = ({listInfo, description, image}) => {
    return (
        <>
            <div className="modal-beer-content">
                <Box
                    className="modal-beer-img"
                    style={{ backgroundSize: "contain" }}
                    sx={{
                        background: `url(${image}) center center no-repeat`,
                    }}
                ></Box>
                <div className="modal-beer-info">
                    {listInfo.map(item => {
                        return <Typography variant="body1">
                              <span className="label-info">{ item.key }:</span> {item.value}
                         </Typography>
                    })}
                </div>
                <div>
                    <Typography variant="body1">
                        <span className="label-info">Описание:</span>
                    </Typography> 
                    <Typography variant="body1">
                        <div className="modal-beer-desc">{description}</div>
                    </Typography>
                </div>
            </div>
        </>
    );
}

export default ProductContent;