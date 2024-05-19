import {Bar} from 'react-chartjs-2';
import React, {useEffect, useState} from "react";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, Message} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

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

export default function RatingChart() {
    const [rating_statistic, setRatingStatistic] = useState(()=> {
        return {
            labels: [],
            datasets: [
                {
                    label: 'Star quantity',
                    data: [],
                    borderColor: '#FF6347',
                    backgroundColor: 'rgba(255,130,1,0.8)',
                }
            ],
        }
    });

    useEffect(()=>{
        GetRatingStatistic();
    }, [])

    const GetRatingStatistic = () => {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/admin/dashboard/rating-statistic`,
            {
                headers: { 'authorization': token}
            }
        ).then((response) => {
            console.log(response.data.rating_statistic)
            const labels = []
            const data = []
            response.data.rating_statistic.map(rating => {
                labels.push(rating.name)
                data.push(rating.value)
            })

            setRatingStatistic({
                labels,
                datasets: [
                    {
                        label: 'Star quantity',
                        data,
                        borderColor: '#FF6347',
                        backgroundColor: 'rgba(255,130,1,0.8)',
                    }
                ],
            })
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }
    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-glass shadow text-center rounded p-4">
                <h5 style={{textAlign: 'start'}}>Rating</h5>
                <Bar options={options} data={rating_statistic}/>
            </div>
        </div>
    )
}