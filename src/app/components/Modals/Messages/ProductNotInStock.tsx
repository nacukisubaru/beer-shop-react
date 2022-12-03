import { FC } from "react";
import { Typography } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";

const ProductNotInStock: FC = () => {
    const { openModalProductNotInStock, closeModalProductNotInStock, setAwareChangesInBasket } = useActions();
    const { modalNotInStock } = useAppSelector((state) => state.orderReducer);

    const closeHandler = () => {
        closeModalProductNotInStock();
        setAwareChangesInBasket({aware: true})
    }

    return (
        <>
            <BasicModal
                open={modalNotInStock}
                setOpen={openModalProductNotInStock}
                setClose={closeHandler}
                title={""}
                width="sm"
                showOkBtn={true}
                body={
                    <>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Ваша корзина изменилась!
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            Некоторые товары из вашей корзины на данный момент
                            отсутствуют в магазине. Ознакомтесь с изменениями в
                            корзине и продолжите оформление заказа нажав на
                            "заказать" повторно, заказ будет оформлен без учета
                            товара которого нет в наличии.
                        </Typography>
                    </>
                }
            />
        </>
    );
};

export default ProductNotInStock;
