import { Bar } from 'react-chartjs-2';
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

const labels = ['khangok1610@gmail.com', 'kien', 'nhan', 'truc', 'khanh', 'duy', 'lap'];
const values = [333, 250, 200,100, 50, 10,5]
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