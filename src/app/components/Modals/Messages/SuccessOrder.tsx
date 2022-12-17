import { FC } from "react";
import { Typography } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useRouter } from "next/router";
import BasicModal from "../BasicModal";

const SuccessOrder: FC = () => {
    const { openModalSuccessOrder, closeModalSuccessOrder, resetBasket } = useActions();
    const { modalSuccessOrder, orderId } = useAppSelector((state) => state.orderReducer);
    const router = useRouter();

    const closeHandler = async () => {
        await resetBasket();
        await closeModalSuccessOrder();
        router.replace('/products/beers');
    }

    return (
        <>
            <BasicModal
                open={modalSuccessOrder}
                setOpen={openModalSuccessOrder}
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
                            Заказ успешно оформлен!
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            Ваш заказ успешно оформлен. Номер заказа {orderId}. Ожидайте оператор с вами свяжется для уточнения деталей.  
                        </Typography>
                    </>
                }
            />
        </>
    );
};

export default SuccessOrder;
