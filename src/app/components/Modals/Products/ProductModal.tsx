import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useBuyProduct } from "../../../hooks/useBuyProduct";
import { createProductForBuy } from "../../../store/services/basket/reducers/basket.slice";
import BasicModal from "../BasicModal";
import ProductContent from "./ProductContent";

interface ICharacteristics {
    key: string,
    value: any
}

interface IProductModal {
    characteristics: ICharacteristics[]
}

const ProductModal: FC<IProductModal> = ({characteristics}) => {
    const { showProduct } = useAppSelector((state) => state.productReducer);
    const productState = useAppSelector((state) => state.productReducer.product);
    const { openProduct, closeProduct } = useActions();
    const { title, description, image } = productState.product;
    const productForBuy:any = createProductForBuy(productState.product);
    const [buy] = useBuyProduct(productForBuy);
   
    return (
        <>
            <BasicModal
                open={showProduct}
                setOpen={openProduct}
                setClose={closeProduct}
                title={title}
                showOkBtn={false}
                width="sm"
                body={
                    <>
                        <ProductContent
                            id={productState.productId}
                            image={image}
                            description={description}
                            listInfo={characteristics}
                            inStock={productState.product.inStock}
                            buy={buy} />
                    </>
                }
            />
        </>
    );
};

export default ProductModal;
