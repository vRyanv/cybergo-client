import React from 'react';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {GeneralNumber, RatingChart, TripChart, VehicleChart} from "~/page/admin/dashboard-page/partials";


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function DashboardPage() {
    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <GeneralNumber/>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <VehicleChart/>
                    <TripChart/>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                   <RatingChart />
                </div>
            </div>
        </>)
}