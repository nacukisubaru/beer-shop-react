import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import { useAppSelector } from "../app/hooks/useAppSelector";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
} from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";
import { FC } from "react";
import { IYandexMap } from "../app/types/seo.types";
import Head from "next/head";
import Link from "next/link";
import Menu from "../app/components/Drawer/Menu/Menu";
import YMapContacts from "../app/components/YandexMaps/Contacts/YMapContacts";
import { host } from "../app/http/http.request.config";

interface ISSRData {
    yandexmap: IYandexMap
}

interface IContactsProps {
    data: ISSRData
}

const Contacts: FC<IContactsProps> = ({ data }) => {
    const { placeName, address, workTime, wayDesc, photosPlace } =
        data.yandexmap;
    const { socialNetworksList, phoneList } = useAppSelector(
        (state) => state.headerReducer
    );

    return (
        <>
             <Head>
                <title>Контакты | Пивградъ</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <Menu
                filterList={[]}
                productType="beers"
            />
            <div style={{ paddingLeft: "40px", marginTop: "25px" }}>
                <Typography>Адрес:</Typography>
                <Typography
                    style={{ fontWeight: "bold", marginBottom: "20px" }}
                >
                    Братьев Луканиных, 7, Калуга
                </Typography>

                {phoneList.length > 0 && (
                    <Typography>Номера телефонов:</Typography>
                )}

                {phoneList.length > 0 && phoneList.map((item) => {
                    return (
                        <Typography
                            key={item.number}
                            style={{ fontWeight: "bold", marginBottom: "20px" }}
                        >
                            {item.number}
                        </Typography>
                    );
                })}

                {socialNetworksList.length > 0 && (
                    <Typography>Социальные сети:</Typography>   
                )}
                
                {socialNetworksList.length > 0 && socialNetworksList.map((item) => {
                    return (
                        <Typography
                            style={{ fontWeight: "bold", marginBottom: "20px" }}
                        >
                            <Link href={item.link} target="_blank">{item.name}</Link>
                        </Typography>
                    );
                })}

                <Typography
                    style={{ fontWeight: "bold", marginBottom: "20px" }}
                >
                    Заходите будем рады :3
                </Typography>
            </div>

            <YMapContacts
                balloon={{
                    namePlace: placeName,
                    address: address,
                    image: photosPlace.data ? photosPlace.data[0].url : [],
                    workTime: workTime,
                    way: wayDesc,
                }}
            />
        </>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ query }) => {
        const props: any = {
            data: {
                yandexmap: {
                    placeName: "Пивградъ бар",
                    address: "ул. Братьев Луканиных, 7, Калуга",
                    workTime: "10:00-20:00",
                    wayDesc: "Остановка Кошелев-проект м-н, Ленинский округ, Калуга",
                    photosPlace:  {data: [{url: host + "/assets/beergrad-photo1.png"}]},
                },
            },
        };

        const resultMapPoints = await cmsQueryExecute(
            "/api/yandex-map-points?populate=*"
        );

        if (resultMapPoints.length > 0) {
            props.data.yandexmap = resultMapPoints[0];
        }

        await store.dispatch(fetchHeaderData());
        await store.dispatch(fetchSocialNetworks());
        await store.dispatch(fetchPhonesList());
        await store.dispatch(fetchArticlesList());

        return {
            props,
        };
    });

export default Contacts;
