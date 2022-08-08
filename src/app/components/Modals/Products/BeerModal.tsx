import { FC, useCallback, useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";
import ProductContent from "./ProductContent";
import "../css/style.css";

import { useBuyProduct } from "../../../hooks/useBuyProduct";
import { useCreateBeerProductForBuy } from "../../../hooks/useBeerMap";

const BeerModal: FC = () => {
    const { showBeer, beer } = useAppSelector((state) => state.beerReducer);
    const { openBeer, closeBeer } = useActions();
    const { title, description, image } = beer.product;
    const { compound, volume, fortress, ibu } = beer;

    const createBeerProductForBuy:any = useCreateBeerProductForBuy(beer);
    const [buy] = useBuyProduct(createBeerProductForBuy);

    const arrayBeer: any = [
        { key: "Состав", value: compound },
        { key: "Объём", value: volume },
        { key: "Крепкость", value: fortress },
        { key: "Ibu", value: ibu }
    ];

    return (
        <>
            <BasicModal
                open={showBeer}
                setOpen={openBeer}
                setClose={closeBeer}
                title={title}
                showOkBtn={false}
                body={
                    <>
                        <ProductContent
                            image={image}
                            description={description}
                            listInfo={arrayBeer} id={beer.id} buy={buy} />
                    </>
                }
            />
        </>
    );
};

export default BeerModal;
