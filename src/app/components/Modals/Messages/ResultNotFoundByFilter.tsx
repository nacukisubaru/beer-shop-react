import { FC } from "react";
import { Typography } from "@mui/material";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BasicModal from "../BasicModal";

interface IResultNotFoundByFilter {
    openModalNotFoundByFilter: () => void,
    closeModalNotFoundByFilter: () => void,
    isOpen: boolean
}

const ResultNotFoundByFilter: FC<IResultNotFoundByFilter> = ({openModalNotFoundByFilter, closeModalNotFoundByFilter, isOpen}) => {
    return (
        <>
            <BasicModal
                open={isOpen}
                setOpen={openModalNotFoundByFilter}
                setClose={closeModalNotFoundByFilter}
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
