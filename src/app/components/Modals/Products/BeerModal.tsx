import { FC } from "react";
import { Box } from "@mui/system";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";
import "../css/style.css";
import { Typography } from "@mui/material";

const BeerModal: FC = () => {
    const { showBeer, beer } = useAppSelector((state) => state.beerReducer);
    const { openBeer, closeBeer } = useActions();
    const { title, description, image } = beer.product;
    const {compound, volume, fortress, ibu} = beer;

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
                        <div className="modal-beer-content">
                            <Box
                                className="modal-beer-img"
                                style={{ backgroundSize: "contain" }}
                                sx={{
                                    background: `url(${image}) center center no-repeat`,
                                }}
                            ></Box>
                            <div className="modal-beer-info">
                                <Typography variant="body1">
                                    <span className="label-info">Состав:</span> {compound}
                                </Typography>
                                <Typography variant="body1">
                                    <span className="label-info">Объём:</span>  {volume}
                                </Typography>
                                <Typography variant="body1">
                                    <span className="label-info">Крепкость:</span> {fortress}
                                </Typography>
                                <Typography  variant="body1">
                                    <span className="label-info">Ibu:</span> {ibu}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body1">
                                    Описание:
                                </Typography> 
                                <Typography variant="body1">
                                    <div className="modal-beer-desc">{description}</div>
                                </Typography>
                            </div>
                        </div>
                    </>
                }
            />
        </>
    );
};

export default BeerModal;
