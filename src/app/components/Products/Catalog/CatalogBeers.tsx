import { FC } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import barrelImage from "../../../../assets/images/beer-barrel.png";
import CatalogList from "./CatalogList";

const CatalogBeers: FC = () => {
    const {beerList} = useAppSelector(state => state.beerReducer);
    return (
        <CatalogList
            productList={beerList}
            redirectCardProps={{
                linkProps: {
                    title: "Перейти в каталог пива",
                    url: "/products/beers",
                },
                icon: barrelImage
            }}
        />
    );
};

export default CatalogBeers;
