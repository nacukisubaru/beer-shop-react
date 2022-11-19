import { FC } from "react";
import Form from "../Form";

interface AddBeerFormProps {
    submit: (body:any) => void;
}

const AddBeerForm: FC<AddBeerFormProps> = ({ submit }) => {
    return (
        <Form
            fields={[
                {
                    name: "title",
                    type: "text",
                    label: "Название",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "description",
                    type: "text",
                    label: "Описание",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "compound",
                    type: "text",
                    label: "Состав",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "quantity",
                    type: "number",
                    label: "Количество",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "price",
                    type: "number",
                    label: "Цена",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "volume",
                    type: "number",
                    label: "Объём",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "fortress",
                    type: "number",
                    label: "Крепкость",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "ibu",
                    type: "number",
                    label: "ibu",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "gradeIds",
                    type: "selectAuto",
                    label: "Сорта",
                    selectProps: {
                        multiple: true,
                        items: [{name: "Эльфийский эль", value: 10}, {name: "Нордский эль", value: 6}, {name: "Краснолюдский эль", value: 6}],
                    },
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "brandId",
                    type: "selectAuto",
                    label: "Бренд",
                    selectProps: {
                        multiple: false,
                        items: [{name: "Морские", value: 8}, {name: "ЛЯ Паулина", value: 7}, {name: "Гусь", value: 6}],
                    },
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                },
                {
                    name: "typePackagingId",
                    type: "select",
                    label: "Тип упаковки",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            {name: "Пластиковая бутылка", value: 1},
                        ]
                    }
                },
                {
                    name: "isActive",
                    type: "select",
                    label: "Активность",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            {name: "Активен", value: true},
                            {name: "Не активен", value: false},
                        ]
                    }
                },
                {
                    name: "filtered",
                    type: "select",
                    label: "Фильтрация",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            {name: "Фильтрованное", value: true},
                            {name: "Не фильтрованное", value: false},
                        ]
                    }
                },
                {
                    name: "forBottling",
                    type: "select",
                    label: "Розлив",
                    validationProps: {
                        required: "Поле обязательно для заполнения",
                    },
                    selectProps: {
                        multiple: false,
                        items: [
                            {name: "Розливное", value: true},
                            {name: "Не розливное", value: false},
                        ]
                    }
                },
            ]}
            submit={submit}
        />
    );
};

export default AddBeerForm;
