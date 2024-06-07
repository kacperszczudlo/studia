import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("black");
    const maxValue = 10;

    const increment = () => {
        if (count < maxValue) {
            setCount(count + 1);
        }
    };

    const reset = () => {
        setCount(0);
    };

    const currentCount = () => {
        if (count >= maxValue) {
            return <div style={{ color: "red" }}>Przekroczono maksymalną wartość!</div>;
        } else {
            return count === 0 ? "Zero" : count;
        }
    };

    return (
        <div>
            <span className="badge bg-primary" style={{ color: color }}>{currentCount()}</span>
            <button className="btn btn-secondary" onClick={increment}>Add Value</button>
            <button className="btn btn-danger" onClick={reset}>Reset</button>
            <div>
                <select className="form-select" value={color} onChange={(e) => setColor(e.target.value)}>
                    <option value="cyan">Cyan</option>
                    <option value="magenta">Magenta</option>
                    <option value="yellow">Yellow</option>
                    <option value="black">Default</option>
                </select>
            </div>
        </div>
    );
};

export default Counter;
