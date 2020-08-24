import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral"



const colorCases = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
};




const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, casesType = 'cases') => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

const LineChart = ({ casesType = 'cases' }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=60")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log("graph", data)
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                    console.log(chartData);
                    // buildChart(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div>
            <h6>i am line gra</h6>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{

                        datasets: [
                            {
                                backgroundColor: colorCases[casesType].hex,
                                // : "rgba(125, 215, 29, 0.5)",
                                // borderColor: "#42f5c5",
                                data: data
                            },
                        ],
                    }}

                />
            )}
        </div>
    );
}

export default LineChart;
