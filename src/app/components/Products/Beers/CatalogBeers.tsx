import { FC } from "react";
import ProductsList from "../ProductsList";
import barrelImage from "../../../../assets/images/beer-barrel.png";

const CatalogBeers: FC = () => {
    return (
        <ProductsList
            productType="beers"
            settingsCardProps={{
                card: {
                    width: "230px",
                    height: "300px",
                },
                button: { width: "210px", height: "30px" },
                titleSize: "16px",
                imageHeight: "125px",
                priceSize: "17px",
            }}
            redirectCardProps={{
                linkProps: {
                    title: "Перейти в каталог пива",
                    url: "/products/beers",
                },
                settingCardRedirectProps: {
                    card: {
                        width: "230px",
                        height: "300px",
                    },
                    imageProps: {
                        image: barrelImage,
                        imageSettings: {
                            height: "100",
                            width: "100",
                        },
                    },
                },
            }}
        />
    );
};

export default CatalogBeers;
