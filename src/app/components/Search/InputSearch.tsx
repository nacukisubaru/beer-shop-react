import { Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./style.css";

interface IInputSearch {
    search: (q: string, sortField: string, order: string) => void;
    reset: () => void;
}

const InputSearch: FC<IInputSearch> = ({ search, reset }) => {
    const { setSearch } = useActions();
    const { q, sortField, order } = useAppSelector((state) => state.filterProductsReducer);
    const ref = useRef();

    const handleSearch = async (e: any) => {
        e.preventDefault();
        const input: any = ref.current;
        const q = input.value;
        if (q) {
            await setSearch({ q });
            const data: any = await search(q, sortField, order);
            if (!data) {
                await setSearch({ q: "" });
                input.value = "";
            }
        }
    };

    const handleReset = () => {
        const input: any = ref.current;
        if (input.value === "") {
            setSearch({ q: "" });
            reset();
        }
    };

    useEffect(() => {
        if (q === "") {
            const input: any = ref.current;
            input.value = "";
        }
    }, [q]);

    return (
        <>
            <form onSubmit={handleSearch}>
                <Box
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                        },
                    }}
                    className="search-wrapper"
                >
                    <TextField
                        inputRef={ref}
                        onChange={handleReset}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                        }}
                        type="submit"
                    >
                        <Search />
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default InputSearch;
