import React from 'react';

const Results = (props) => {
    var text = "";
    if(props.points === 1)
        text = "point";
    else
        text = "points";

    return (
        <p>{props.points} {text}</p>
    )
};

export default Results;