import { FC } from "react";
import { Box } from "@mui/system";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Typography } from "@mui/material";
import BasicModal from "../BasicModal";
import "../css/style.css";
import ProductContent from "./ProductContent";

const BeerModal: FC = () => {
    const { showBeer, beer } = useAppSelector((state) => state.beerReducer);
    const { openBeer, closeBeer } = useActions();
    const { title, description, image } = beer.product;
    const {compound, volume, fortress, ibu} = beer;

    const arrayBeer:any = [
        {key:'Состав', value: compound},
        {key:'Объём', value: volume},
        {key:'Крепкость', value: fortress},
        {key:'Ibu', value: ibu},
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
                        <ProductContent image={image} description={description} listInfo={arrayBeer} />
                    </>
                }
            />
        </>
    );
};

export default BeerModal;
