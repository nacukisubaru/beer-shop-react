import { Button } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import imageMap from "../../../../assets/images/beergrad-photo1.png";
import CustomPortal from "../../Portal/CustomPortal";
import YMapBaloon from "../Baloon/YMapBaloon";

interface IBalloon {
    namePlace: string,
    address: string,
    image: any,
    workTime: string,
    way: string,
}

interface YMapContactsProps {
    balloon: IBalloon
}

const YMapContacts: FC<YMapContactsProps> = ({balloon}) => {
    const [activePortal, setActivePortal] = useState(false);
    const [placemarkIsLoaded, setPlacemarkLoaded] = useState(false);
    const placemark: any = useRef(null);

    useEffect(()=>{
        if(placemarkIsLoaded) {
            if (placemark.current !== null) {
                placemark.current.balloon.open();
                placemark.current.events.add("balloonopen", () => {
                    setActivePortal(true);
                });
                placemark.current.events.add("balloonclose", () => {
                    setActivePortal(false);
                });
            }
        }
    }, [placemarkIsLoaded]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
            }}
        >
            <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
                <Map
                    defaultState={{ center: [54.497519, 36.180888], zoom: 18 }}
                    width="100%"
                    height="600px"
                >
                    <Placemark
                        instanceRef={(el: any) => {
                            placemark.current = el;
                            setPlacemarkLoaded(true);
                        }}
                        geometry={[54.497296, 36.181515]}
                        properties={{
                            iconContent: "", // пару символов помещается
                            hintContent:
                                "<b> Пивградъ </b>",
                            balloonContent: `<div id="cardBalloon" style=" width: 240px;
                            height: 400px;"></div>`,
                        }}
                        options={{ openEmptyBalloon: true, balloonPanelMaxMapArea: 1}}
                        modules={['geoObject.addon.balloon']}
                        
                        onClick={() => {
                            // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                            setTimeout(() => {
                                setActivePortal(true);
                            }, 0);
                        }}
                    />
                </Map>
            </YMaps>

            {activePortal && (
                <CustomPortal
                    children={
                        <YMapBaloon
                            baloonProps={balloon}
                        />
                    }
                    elementId="cardBalloon"
                ></CustomPortal>
            )}
        </div>
    );
};

export default YMapContacts;
