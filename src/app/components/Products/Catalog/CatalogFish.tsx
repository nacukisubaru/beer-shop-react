import { FC } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import fishImage from "../../../../assets/images/fish.png";
import CatalogList from "./CatalogList";

const CatalogFish: FC = () => {
    const {fishList} = useAppSelector(state => state.fishReducer);
    return (
        <CatalogList
            productType="fish"
            productList={fishList}
            redirectCardProps={{
                linkProps: {
                    title: "Перейти в каталог рыбы",
                    url: "/products/fish",
                },
                icon: fishImage
            }}
        />
    );
};

export default CatalogFish;