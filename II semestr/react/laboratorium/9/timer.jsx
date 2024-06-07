import React from "react";
import {useEffect} from "react";

const Timer = (props) => {

    useEffect(() => {
        if(props.disableTimer) {
            const interval = setInterval(() => props.runTimer(), 1000);

            return () => clearInterval(interval);
        }
    });

    return(
        <div>
            {props.disableTimer &&
            <p>Time left: {props.time} seconds</p>}
        </div>
    );
};

export default Timer;