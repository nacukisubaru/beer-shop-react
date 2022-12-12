import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useBuyProduct } from "../../../hooks/useBuyProduct";
import { createProductForBuy } from "../../../store/services/basket/reducers/basket.slice";
import BasicModal from "../BasicModal";
import ProductContent from "./ProductContent";
//import "../css/style.css";

const BeerModal: FC = () => {
    const { showBeer, beer } = useAppSelector((state) => state.beerReducer);
    const { openBeer, closeBeer } = useActions();
    const { title, description, image } = beer.product;
    const { compound, volume, fortress, ibu, product, forBottling, filtered } = beer;
    const createBeerProductForBuy:any = createProductForBuy(beer.product);
    const [buy] = useBuyProduct(createBeerProductForBuy);
    const arrayBeer: any = [
        { key: "Состав", value: compound },
        { key: "Объём", value: volume },
        { key: "Крепкость", value: fortress },
        { key: "Ibu", value: ibu },
        { key: "Бренд", value: product.brandName },
        { key: "Вид упаковки", value: product.typePackagingName },
        { key: "На разлив", value: forBottling ? "Да": "Нет" },
        { key: "Фильтрованное", value: filtered ? "Да": "Нет" },
        { key: "В наличии", value: product.inStock ? "Да": "Нет" },
    ];

    return (
        <>
            <BasicModal
                open={showBeer}
                setOpen={openBeer}
                setClose={closeBeer}
                title={title}
                showOkBtn={false}
                width="sm"
                body={
                    <>
                        <ProductContent
                            id={beer.productId}
                            image={image}
                            description={description}
                            listInfo={arrayBeer}
                            inStock={product.inStock}
                            buy={buy} />
                    </>
                }
            />
        </>
    );
};

export default BeerModal;
