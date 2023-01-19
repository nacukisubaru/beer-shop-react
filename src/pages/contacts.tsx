import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import YMapContacts from "../app/components/YandexMaps/Contacts/YMapContacts";
import { cmsQueryExecute } from "../app/helpers/cmsHelper";
import { wrapper } from "../app/store/store";


const Contacts = ({data}) => {
    const { placeName, address, workTime, wayDesc, photosPlace } = data.yandexmap;

    return (
        <>
            <div style={{ paddingLeft: "40px", marginTop: "25px" }}>
                <Typography>Адрес:</Typography>
                <Typography style={{ fontWeight: "bold", marginBottom: "20px" }}>
                    Братьев Луканиных, 7, Калуга
                </Typography>

                <Typography>Номер телефона:</Typography>
                <Typography style={{ fontWeight: "bold", marginBottom: "20px" }}>
                    +7 920 899 77 72 
                </Typography>
                <Typography style={{ fontWeight: "bold", marginBottom: "20px" }}>
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
                    photosPlace: {}
                }
            },
        };

        const resultMapPoints = await cmsQueryExecute(
            "/api/yandex-map-points?populate=*"
        );
  
        if (resultMapPoints.length > 0) {
            props.data.yandexmap = resultMapPoints[0];
        }

        return {
            props,
        };
    });


export default Contacts;
