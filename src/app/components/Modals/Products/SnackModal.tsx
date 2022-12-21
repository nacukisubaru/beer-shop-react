import { useAppSelector } from "../../../hooks/useAppSelector";
import ProductModal from "./ProductModal";

export default function SnackModal() {
    const { product } = useAppSelector(
        (state) => state.productReducer
    );
    const { brandName, typePackagingName, inStock } = product;
    const characteristicsList: any = [
        { key: "Вес", value: product.weight },
        { key: "Бренд", value: brandName },
        { key: "Вид упаковки", value: typePackagingName },
        { key: "В наличии", value: inStock ? "Да": "Нет" },
    ];

    return <ProductModal characteristics={characteristicsList} />
}