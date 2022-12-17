import { FC, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../hooks/useAppSelector";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import styles from "../styles/modal.module.css";

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
            <div className={styles.modalBeerContent}>
                <div>
                    <Box
                        className={styles.modalBeerImg}
                        style={{ backgroundSize: "contain" }}
                        sx={{
                            background: `url(${image}) center center no-repeat`,
                        }}
                    ></Box>
        
                    <div className={styles.quantity}>
                        <span className={!inStock ? styles.disableText : ""}>
                            <RemoveCircleOutlineIcon style={{cursor: "pointer"}} onClick={handlerMinusQuan}/>
                        </span>
                            <div className={!inStock ? styles.disableText: ""}><Typography variant="body1">{quantity}</Typography></div>
                        <span  className={!inStock ? styles.disableText : ""}>
                            <AddCircleOutlineIcon style={{cursor: "pointer"}} onClick={handlerPlusQuan}/>
                        </span>
                    </div>
                    <div className={styles.buyBtn}>
                        <Button variant="outlined" style={{width:'200px'}} disabled={inStock ? false : true} onClick={handleBuy}>купить</Button>
                    </div>
                </div>
               
                <div className={styles.modalBeerInfo}>
                    {listInfo.map(item => {
                        return <Typography variant="body1">
                              <span className={styles.labelInfo}>{ item.key }:</span> {item.value}
                         </Typography>
                    })}
                </div>
                
                <div>
                    <Typography variant="body1">
                        <span className={styles.labelInfo}>Описание:</span>
                    </Typography> 
                    <Typography variant="body1">
                        <div className={styles.modalBeerDesc}>{description}</div>
                    </Typography>
                </div>
            </div>
        </>
    );
}

export default ProductContent;