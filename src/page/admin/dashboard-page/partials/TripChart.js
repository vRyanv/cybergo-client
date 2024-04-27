import {Bar} from "react-chartjs-2";
import React from "react";

const labels = ['Moto', 'Car', 'Truck'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Trip quantity',
            data: [10,20,38],
            borderColor: '#FF6347',
            backgroundColor: 'rgba(255,130,1,0.8)',
        }
    ],
};

export const options = {
    responsive: true,
    elements: {
        bar: {
            borderWidth: 3,
        },
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Trip by vehicle',
        },
    },
};
export default function TripChart(){
    return <Bar options={options} data={data}/>
}