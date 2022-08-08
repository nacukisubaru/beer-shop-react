import { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "../css/style.css";

interface IListInfoItem {
    key: string,
    value: string
}

interface IProductContent {
    id: number,
    listInfo: IListInfoItem[],
    description: string,
    image: string,
    buy: (id: number) => void
}

const ProductContent: FC<IProductContent> = ({id, listInfo, description, image, buy}) => {
    
    const handleBuy = () => {
        return buy(id);
    }

    return (
        <>
            <div className="modal-beer-content">
                <div>
                    <Box
                        className="modal-beer-img"
                        style={{ backgroundSize: "contain" }}
                        sx={{
                            background: `url(${image}) center center no-repeat`,
                        }}
                    ></Box>
        
                    <div className="basket-quantity">
                        <RemoveCircleOutlineIcon />
                            <div>1</div>
                        <AddCircleOutlineIcon />
                    </div>
                    <div className="buy-btn">
                        <Button onClick={handleBuy}>купить</Button>
                    </div>
                </div>
               
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