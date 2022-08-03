import { Typography } from "@mui/material";
import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";

const ResultNotFoundByFilter: FC = () => {
    const { openModalNotFoundByFilter, closeModalNotFoundByFilter } = useActions();
    const isOpen = useAppSelector(
        (state) => state.filterProductsReducer.modalNotFoundByFilter
    );

    return (
        <>
            <BasicModal
                open={isOpen}
                setOpen={openModalNotFoundByFilter}
                setClose={closeModalNotFoundByFilter}
                body={
                    <>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            ОЙ!
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            По вашему запросу результаты не найдены!
                        </Typography>
                    </>
                }
            />
        </>
    );
};

export default ResultNotFoundByFilter;
