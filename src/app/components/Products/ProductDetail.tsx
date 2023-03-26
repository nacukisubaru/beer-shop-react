import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useBuyProduct } from "../../../app/hooks/useBuyProduct";
import { IProductBasket } from "../../../app/types/product.types";
import Menu from "../../../app/components/Drawer/Menu/Menu";
import CustomSnackBar from "../../../app/components/CustomUI/CustomSnackBar/CustomSnackBar";
import Link from "next/link";
import Head from "next/head";
import styles from "./styles/product.module.css";

interface ISeoProps {
    title: string;
    desc: string;
    keywords: string;
}

interface ICharacteristic {
    label: string;
    name: any;
}

interface IProductProps {
    image: any;
    title: string;
    description: string;
    characteristics: ICharacteristic[];
}

interface IBuyProps {
    productBasket: IProductBasket;
    productInStock: boolean;
}

interface IProductDetailProps {
    seoProps: ISeoProps;
    productProps: IProductProps;
    buyProps: IBuyProps;
    redirectUrl: string;
}

const ProductDetail: FC<IProductDetailProps> = ({
    seoProps,
    productProps,
    buyProps,
    redirectUrl
}) => {
    const { buyProduct, inBasket, isBuyBtnClick } = useBuyProduct(
        buyProps.productBasket
    );

    return (
        <>
            <Head>
                <meta name="keywords" content={seoProps.keywords}></meta>
                <meta name="description" content={seoProps.desc}></meta>
                <title>{seoProps.title}</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <Menu filterList={[]} productType="beers" />
            <div className={styles.detailCardWrapp}>
                <Link href={redirectUrl}>
                    <Typography>&#8592; Назад</Typography>
                </Link>
                <div className={styles.detailWrapper}>
                    <div>
                        <Box
                            className={styles.detailImage}
                            sx={{
                                background: `url(${productProps.image}) center center no-repeat`,
                                backgroundSize: "contain"
                            }}
                        ></Box>
                    </div>
                    <div className={styles.detailInfo}>
                        <Typography
                            variant="h5"
                            style={{ marginBottom: "5px" }}
                        >
                            {productProps.title}
                        </Typography>
                        {productProps.characteristics.map((item) => {
                            return (
                                <Typography key={item.label}>
                                    {item.label}: {item.name}
                                </Typography>
                            );
                        })}

                        <Button
                            variant={inBasket ? "outlined" : "contained"}
                            style={{ width: "200px", marginTop: "14px" }}
                            disabled={buyProps.productInStock ? false : true}
                            onClick={buyProduct}
                        >
                            {inBasket
                                ? "Перейти в корзину"
                                : "Добавить корзину"}
                        </Button>
                    </div>
                </div>
                <div className={styles.description}>
                    <Typography variant="h5">Описание:</Typography>
                    <Typography>{productProps.description}</Typography>
                </div>
            </div>
            <CustomSnackBar
                severity="success"
                message="Товар добавлен в корзину"
                isOpen={isBuyBtnClick}
            />
        </>
    );
};

export default ProductDetail;
