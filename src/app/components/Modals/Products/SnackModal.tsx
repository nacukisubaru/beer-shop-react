import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";
import ProductContent from "./ProductContent";
import "../css/style.css";

import { useBuyProduct } from "../../../hooks/useBuyProduct";
import { createProductForBuy } from "../../../store/services/basket/reducers/basket.slice";


const SnackModal: FC = () => {
    const { showSnack, snack } = useAppSelector((state) => state.snackReducer);
    const { openSnack, closeSnack } = useActions();
    const { title, description, image, brandName, typePackagingName } = snack.product;
    const {weight} = snack;

    const createBeerProductForBuy:any = createProductForBuy(snack.product);
    const [buy] = useBuyProduct(createBeerProductForBuy);

    const arrayBeer: any = [
        { key: "Вес", value: weight },
        { key: "Бренд", value: brandName },
        { key: "Вид упаковки", value: typePackagingName },
    ];

    return (
        <>
            <BasicModal
                open={showSnack}
                setOpen={openSnack}
                setClose={closeSnack}
                title={title}
                showOkBtn={false}
                body={
                    <>
                        <ProductContent
                            id={snack.productId}
                            image={image}
                            description={description}
                            listInfo={arrayBeer}
                            buy={buy} />
                    </>
                }
            />
        </>
    );
};

export default SnackModal;
