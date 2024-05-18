import {Bar} from 'react-chartjs-2';

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Rating of user',
        },
    },
};

const labels = ['letruc2108@gmail.com', 'khangok1610@gmail.com', 'user1@gmail.com'];
const values = [10, 5]
const data = {
    labels,
    datasets: [
        {
            label: 'Total star quantity',
            data: values,
            borderColor: '#FF6347',
            backgroundColor: 'rgba(255,130,1,0.8)',
        },
    ],
};

export function RatingChart() {
    return <Bar options={options} data={data} />;
}