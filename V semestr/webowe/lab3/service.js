// service.js
const convertData = (data) => {
    const lines = data.trim().split('\n');
    lines.shift();
    return lines.map(line => {
        const [date, temperature] = line.split(',');
        return {
            x: date,
            y: parseFloat(temperature)
        };
    });
};

module.exports = { convertData };