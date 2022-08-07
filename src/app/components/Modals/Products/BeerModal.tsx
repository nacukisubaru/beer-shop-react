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
                                <Typography>
                                    Состав: {compound}
                                </Typography>
                                <Typography>
                                    Объём: {volume}
                                </Typography>
                                <Typography>
                                    Крепкость: {fortress}
                                </Typography>
                                <Typography>
                                    Ibu: {ibu}
                                </Typography>
                            </div>
                                <Typography>
                                    Описание:
                                </Typography>
                            <div className="modal-beer-desc">{description}</div>
                        </div>
                    </>
                }
            />
        </>
    );
};

export default BeerModal;
