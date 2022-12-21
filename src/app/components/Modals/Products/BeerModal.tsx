import { useAppSelector } from "../../../hooks/useAppSelector";
import ProductModal from "./ProductModal";

export default function BeerModal() {
    const { product } = useAppSelector(
        (state) => state.productReducer
    );
    const { compound, volume, fortress, ibu, forBottling, filtered } = product;
    const characteristicsList: any = [
        { key: "Состав", value: compound },
        { key: "Объём", value: volume },
        { key: "Крепкость", value: fortress },
        { key: "Ibu", value: ibu },
        { key: "Бренд", value: product.product.brandName },
        { key: "Вид упаковки", value: product.product.typePackagingName },
        { key: "На разлив", value: forBottling ? "Да" : "Нет" },
        { key: "Фильтрованное", value: filtered ? "Да" : "Нет" },
        { key: "В наличии", value: product.product.inStock ? "Да" : "Нет" },
    ];

    return <ProductModal characteristics={characteristicsList} />
}
