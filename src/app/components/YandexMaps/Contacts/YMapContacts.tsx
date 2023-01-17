import { Button } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import imageMap from "../../../../assets/images/beergrad-photo1.png";
import CustomPortal from "../../Portal/CustomPortal";
import YMapBaloon from "../Baloon/YMapBaloon";

const Baloon: FC = () => {
    return (
        <YMapBaloon
            baloonProps={{
                namePlace: "Пивградъ",
                address: "Калужская область, Калуга, Братьев Луканиных, 7",
                image: imageMap,
                workTime: "Ежедневно 10:00-22:00",
                way: `Остановка Кошелев-проект. Напротив школа №45.
                    Дом №7 вход дверь с табличкой 'фото'.`,
            }}
        />
    );
};

const YMapContacts: FC = () => {
    const [activePortal, setActivePortal] = useState(false);
    const [placemarkIsLoaded, setPlacemarkLoaded] = useState(false);
    const placemark = useRef(null);

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
                        instanceRef={el => {
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
                    children={<Baloon />}
                    elementId="cardBalloon"
                ></CustomPortal>
            )}
        </div>
    );
};

export default YMapContacts;
