import { Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import styles from "../styles/yandexmap.module.css";

interface BaloonProps {
    namePlace: string;
    address: string;
    image: any;
    workTime: string;
    way: string;
}

interface YMapBaloonProps {
    baloonProps: BaloonProps;
}

const YMapBaloon: FC<YMapBaloonProps> = ({ baloonProps }) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {baloonProps.namePlace}
                </Typography>
               
            </div>

            <Typography style={{ fontSize: "15px", marginBottom: "5px" }}>
                {baloonProps.address}
            </Typography>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                }}
            >
                <Image src={baloonProps.image} className={styles.mapCardImg} />
            </div>
            <Typography style={{ fontSize: "15px" }}>
                <span style={{ fontWeight: "bold" }}>Режим работы: </span>
                {baloonProps.workTime}
            </Typography>
            <Typography style={{ fontSize: "15px" }}>
                <span style={{ fontWeight: "bold" }}>Проезд: </span>
                {baloonProps.way}
            </Typography>
        </>
    );
};

export default YMapBaloon;
