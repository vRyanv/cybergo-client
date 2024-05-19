import {Bar} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, OutlinedInput, Stack} from "@mui/material";
import {Filter} from "~/assets/icon";
import LoadingButton from "@mui/lab/LoadingButton";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, Int, Message} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

const labels = ['Moto', 'Car', 'Truck'];

const options = {
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
export default function TripChart() {
    const [is_loading, setIsLoading] = useState(true);
    const [filter_date, setFilterDate] = useState(()=> {
        const date = new Date();
        const month = date.getMonth() + 1;
        const from_date = [
            date.getFullYear(),
            String(month).padStart(2, '0'),
            '01'
        ].join('-');


        const to_date = [
            date.getFullYear(),
            String(month).padStart(2, '0'),
            month === 2 ? '28' : '30',
        ].join('-');

        return {
            from_date,
            to_date
        }
    });
    const [trip_statistic, setTripStatistic] = useState(()=> {
        return {
            labels,
            datasets: [
                {
                    label: 'Trip quantity',
                    data: [0, 0, 0],
                    borderColor: '#FF6347',
                    backgroundColor: 'rgba(255,130,1,0.8)',
                }
            ],
        }
    });

    useEffect(()=>{
        GetTripStatistic();
    }, [])
    
    const GetTripStatistic = () => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/admin/dashboard/trip-statistic/${filter_date.from_date}/${filter_date.to_date}`,
            {
                headers: { 'authorization': token}
            }
        ).then((response) => {
            const data = [
                response.data.trip_statistic.moto,
                response.data.trip_statistic.car,
                response.data.trip_statistic.truck
            ]
            setTimeout(()=>{
                setTripStatistic({
                    labels,
                    datasets: [
                        {
                            label: 'Trip quantity',
                            data,
                            borderColor: '#FF6347',
                            backgroundColor: 'rgba(255,130,1,0.8)',
                        }
                    ],
                })
                setIsLoading(false)
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }
    const onFilterChat = () => {
        GetTripStatistic()
    }

    return (
        <div className="col-sm-12 col-xl-6">
            <div className="bg-glass shadow text-center rounded p-4">
                <Stack direction={{xs: 'column', sm: 'row', md: 'row'}}
                       useFlexGap
                       justifyContent="space-between"
                       flexWrap="wrap"
                       spacing={2}>
                    <h5 style={{textAlign: 'start'}}>Trip</h5>
                    <Stack
                        spacing={2}
                        gap={1}
                        direction={{xs: 'column', sm: 'row', md: 'row'}}
                        flexWrap={'wrap'}
                        justifyContent="space-around"
                    >
                        <FormControl variant="outlined" size="small">
                            <InputLabel htmlFor="input_from_date">From date</InputLabel>
                            <OutlinedInput
                                id="input_from_date"
                                type={'date'}
                                value={filter_date.from_date}
                                onChange={(e) => setFilterDate({...filter_date, from_date: e.target.value})}
                                label="From date"
                            />
                        </FormControl>
                        <FormControl variant="outlined" size="small">
                            <InputLabel htmlFor="input_to_date">To Date</InputLabel>
                            <OutlinedInput
                                id="input_to_date"
                                type={'date'}
                                value={filter_date.to_date}
                                onChange={(e) => setFilterDate({...filter_date, to_date: e.target.value})}
                                label="To Date"
                            />
                        </FormControl>
                        <LoadingButton startIcon={<Filter/>}
                                       variant="outlined"
                                       onClick={onFilterChat}
                                       loading={is_loading}
                                       loadingPosition={'start'}
                                       color={'info'}>Filter</LoadingButton>
                    </Stack>
                    <Bar options={options} data={trip_statistic}/>
                </Stack>
            </div>
        </div>
    )
}