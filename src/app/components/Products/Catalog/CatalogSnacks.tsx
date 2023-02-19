import { FC } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import snacksImage from "../../../../assets/images/snacks.png";
import CatalogList from "./CatalogList";

const CatalogSnacks: FC = () => {
    const {snackList} = useAppSelector(state => state.snackReducer);
    return (
        <CatalogList
            productType="snacks"
            productList={snackList}
            redirectCardProps={{
                linkProps: {
                    title: "Перейти в каталог снеков",
                    url: "/products/beers",
                },
                icon: snacksImage
            }}
        />
    );
};

export default CatalogSnacks;
