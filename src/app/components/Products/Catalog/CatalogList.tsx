import React, { FC } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useProductMap } from "../../../hooks/useProductMap";
import CardList from "../../Cards/CardList";
import CardRedirect, { ILink, ISettingsCardRedirect } from "../../Cards/CardRedirect";
import { ISettingsCard } from "../../Cards/CardSmall";

interface IRedirectCardProps {
    linkProps: ILink,
    icon: any
}

interface IProductList {
    redirectCardProps?: IRedirectCardProps;
    productList:any;
    productType: string;
}

const CatalogList: FC<IProductList> = ({
    productList,
    redirectCardProps,
    productType
}) => {
    const products = useProductMap(productList, productType);
    return (
        <>   
            {productList.length > 0 && (
                <>
                    <CardList
                        cardsList={products}
                        scrollList={false}
                        settingsCardProps={{
                            card: {
                                width: "230px",
                                height: "307px",
                            },
                            button: { width: "210px", height: "30px" },
                            titleSize: "17px",
                            imageHeight: "150px",
                            priceSize: "17px",
                        }}
                        childrenComponent={
                            redirectCardProps && (
                                <CardRedirect
                                    settingsCardProps={{
                                        card: {
                                            width: "230px",
                                            height: "307px",
                                        },
                                        imageProps: {
                                            image: redirectCardProps.icon,
                                            imageSettings: {
                                                height: 100,
                                                width: 100,
                                            },
                                        },
                                    }}
                                    linkProps={redirectCardProps.linkProps}
                                />
                            )
                        }
                    ></CardList>
                </>
            )}
        </>
    );
};

export default CatalogList;
