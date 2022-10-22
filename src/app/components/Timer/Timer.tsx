import { FC, useEffect } from "react";

interface ISecondsArgs {
    seconds: number
}

interface IMinutesArgs {
    minutes: number
}

interface TimerProps {
    setSeconds: (secondsObj: ISecondsArgs) => void,
    setMinutes: (minutesObj: IMinutesArgs) => void,
    minutes: number,
    seconds: number
}

const Timer: FC<TimerProps> = ({minutes, seconds, setSeconds, setMinutes}) => {
    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds({seconds: seconds - 1});
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);             
                } else {
                    setSeconds({seconds: 59});
                    setMinutes({minutes: minutes - 1});
                }
            } 
        }, 1000);
        
        return ()=> {
            clearInterval(myInterval);
        };
    });

    return (
        <>
            { minutes === 0 && seconds === 0
                ? null
                : <div id="timer" style={{ color: '#b05326', width: 40, fontWeight: 600 }}>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
            }
        </>
    )
}

export default Timer;