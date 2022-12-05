import { useCatalog } from "../../../../../hooks/useCatalog";
import { beerApi } from "../../../../../store/services/beers/beer.api";
import { useTableAction } from "../../../../../hooks/useTableAction";
import BeerFilterTable from "../Filters/BeerFilterTable";
import AddBeerForm from "../Forms/Products/Beers/AddBeerForm";
import UpdBeerForm from "../Forms/Products/Beers/UpdBeerForm";
import EditIcon from "@mui/icons-material/Edit";
import TableAdmin from "./Table";
import { gradeApi } from "../../../../../store/services/grades/grade.api";
import { typePackagingApi } from "../../../../../store/services/type-packaging/type-packaging.api";
import { brandApi } from "../../../../../store/services/brands/brand.api";

export default function BeerTableAdmin() {
    const gradesList = gradeApi.useGradesListQuery({});
    const brandsList = brandApi.useGetListByProductTypeQuery("beers");
    const packagingList = typePackagingApi.useGetListByProductTypeQuery("beers");
    const { rows, addRow, updRow, clearStateResponse, stateResponse } =
        useCatalog(beerApi, "beer");
    const { rowEdit, closeTableModal, isUpdAction, message } = useTableAction({
        successMessage: "Товар успешно добавлен",
        successMessageUpd: "Товар успешно обновлен",
        successMessageRemove: "Товар успешно удален",
    });

    return (
        <TableAdmin
            columns={[
                { field: "id", headerName: "ID", width: 70 },
                { field: "title", headerName: "Название", width: 200 },
                { field: "description", headerName: "Описание", width: 150 },
                { field: "price", headerName: "Цена", width: 150 },
                {
                    field: "quantity",
                    headerName: "Количество",
                    width: 150,
                    filterable: false,
                },
                { field: "isActive", headerName: "Активность", width: 150 },
                { field: "inStock", headerName: "В наличии", width: 150 },
                {
                    field: "brandName",
                    headerName: "Название бренда",
                    width: 150,
                },
                {
                    field: "typePackagingName",
                    headerName: "Тип упаковки",
                    width: 150,
                },
                {
                    field: "compound",
                    headerName: "Состав",
                    width: 150,
                    filterable: false,
                },
                {
                    field: "volume",
                    headerName: "Объем",
                    width: 150,
                    filterable: false,
                },
                {
                    field: "fortress",
                    headerName: "Крепкость",
                    width: 150,
                    filterable: false,
                },
                {
                    field: "ibu",
                    headerName: "ibu",
                    width: 150,
                    filterable: false,
                },
                { field: "forBottling", headerName: "На розлив", width: 150 },
                { field: "filtered", headerName: "Фильтрованное", width: 150 },
            ]}
            tableProps={{ rows, clearStateResponse, stateResponse }}
            modalProps={{
                childrenModal: isUpdAction ? (
                    <UpdBeerForm
                        gradesList={gradesList.data ? gradesList.data : []}
                        brandsList={brandsList.data ? brandsList.data : []}
                        packagingList={
                            packagingList.data ? packagingList.data : []
                        }
                        submit={updRow}
                    />
                ) : (
                    <AddBeerForm
                        gradesList={gradesList.data ? gradesList.data : []}
                        brandsList={brandsList.data ? brandsList.data : []}
                        packagingList={
                            packagingList.data ? packagingList.data : []
                        }
                        submit={addRow}
                    />
                ),
                titleModal: isUpdAction ? "Обновить пиво" : "Добавить пиво",
                successMessage: message,
                width: "sm",
                closeModal: closeTableModal,
            }}
            actionButtons={[
                {
                    color: "primary",
                    size: "small",
                    onClick: rowEdit,
                    icon: <EditIcon />,
                },
            ]}
            filterPanel={BeerFilterTable}
        />
    );
}
