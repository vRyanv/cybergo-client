import {Bar} from "react-chartjs-2";
import React from "react";

const labels = ['Moto', 'Car', 'Truck'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [10],
            backgroundColor: [
                'rgba(255, 121, 0, 0.5)',
            ]
        }
    ],
};


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

export default function VehicleTypePercentage() {
    return <Bar options={options} data={data}/>
}