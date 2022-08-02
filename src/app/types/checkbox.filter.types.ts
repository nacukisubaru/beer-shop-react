export interface ICheckboxFilter {
    id: number;
    name: string;
    selectedList: number[];
    setFilter: (id: number) => void;
}
