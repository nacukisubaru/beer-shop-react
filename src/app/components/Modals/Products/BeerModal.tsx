import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";

const BeerModal: FC = () => {
    const {showBeer} = useAppSelector((state) => state.beerReducer);
    const {openBeer, closeBeer} = useActions();

    return (
        <>
            <BasicModal
                open={showBeer}
                setOpen={openBeer}
                setClose={closeBeer}
                body={
                    <>
                        Это детальная инфа по пиву
                    </>
                }
            />
        </>
    );
}

export default BeerModal;