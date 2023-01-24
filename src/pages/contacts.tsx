import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Menu from "../app/components/Drawer/Menu/Menu";
import YMapContacts from "../app/components/YandexMaps/Contacts/YMapContacts";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import { useAppSelector } from "../app/hooks/useAppSelector";
import {
    fetchArticlesList,
    fetchHeaderData,
    fetchPhonesList,
    fetchSocialNetworks,
    headerReducer,
} from "../app/store/reducers/header.slice";
import { wrapper } from "../app/store/store";

const Contacts = ({ data }) => {
    const { placeName, address, workTime, wayDesc, photosPlace } =
        data.yandexmap;
    const { socialNetworksList, phoneList } = useAppSelector(
        (state) => state.headerReducer
    );

    return (
        <>
             <Menu
                callbackApplyFilter={() => {}}
                callbackResetFilter={() => {}}
                filter={{ minPrice: 0, maxPrice: 0, productType: "" }}
                filterList={[]}
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
                    placeName: "",
                    address: "",
                    workTime: "",
                    wayDesc: "",
                    photosPlace: {},
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
