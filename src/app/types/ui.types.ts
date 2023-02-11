export interface IButtonOption {
    color:
        | "inherit"
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning";
    size: "small" | "medium" | "large";
    icon: any;
    onClick: (params: any) => void;
}