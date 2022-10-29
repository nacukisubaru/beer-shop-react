import { FC, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "../css/style.css";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface IListInfoItem {
    key: string,
    value: string
}

interface IProductContent {
    id: number,
    listInfo: IListInfoItem[],
    description: string,
    image: string,
    inStock: boolean,
    buy: (quantity: number) => void
}

const ProductContent: FC<IProductContent> = ({id, listInfo, description, image, inStock, buy}) => {
    const {list} = useAppSelector(state => state.basketReducer);

    const findItemInBasket = (id:number) => {
        const items = list.filter(item => {
            if(item.id === id) {
                return item;
            }
            return false;
        });

        if(items.length <= 0) {
            return false;
        }

        return items[0];
    }

    const quan = findItemInBasket(id);
    const [quantity, setQuantity] = useState(quan ? quan.quantity : 1);
    const [totalQuan, setTotalQuan] = useState(0);

    const handlerPlusQuan = async () => {
        if(inStock) {
            await setQuantity(quantity + 1);
            setTotalQuan(quantity + totalQuan);
        }
    }

    const handlerMinusQuan = async () => {
        if(quantity > 1 && inStock) {
            await setQuantity(quantity - 1);
            setTotalQuan(quantity - totalQuan);
        }
     }

    const handleBuy = () => {
        return buy(quantity);
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
        
                    <div className="quantity">
                        <span className={!inStock ? "disable-text" : ""}>
                            <RemoveCircleOutlineIcon style={{cursor: "pointer"}} onClick={handlerMinusQuan}/>
                        </span>
                            <div className={!inStock ? "disable-text" : ""}>{quantity}</div>
                        <span  className={!inStock ? "disable-text" : ""}>
                            <AddCircleOutlineIcon style={{cursor: "pointer"}} onClick={handlerPlusQuan}/>
                        </span>
                    </div>
                    <div className="buy-btn">
                        <Button variant="outlined" style={{width:'200px'}} disabled={inStock ? false : true} onClick={handleBuy}>купить</Button>
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