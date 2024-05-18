'use-client';

import { useState } from "react";
import { Report } from "../interfaces/interfaces";
import { ReportCard } from "./ReportCard";

interface Props {
    report: Report;
}

export const StrikeGridItem = ({ report }: Props) => {

    const [response1, setResponse1] = useState(null);
    const [response2, setResponse2] = useState(null);

    const handleButtonClick1 = async () => {
        try {
            // const response = await fetch(`/api/endpoint1/${report.codigo}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ /* datos que necesites enviar en el cuerpo */ }),
            // });
            // const data = await response.json();
            // setResponse1(data);
            console.log('btn 1')
        } catch (error) {
            console.error('Error fetching data from endpoint 1:', error);
        }
    };

    const handleButtonClick2 = async () => {
        try {
            // const response = await fetch(`/api/endpoint2/${report.codigo}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ /* datos que necesites enviar en el cuerpo */ }),
            // });
            // const data = await response.json();
            // setResponse2(data);
            console.log('btn 2')
        } catch (error) {
            console.error('Error fetching data from endpoint 2:', error);
        }
    };

    return (
        <div className="rounded-md overflow-hidden border border-gray-300 shadow-lg">
            <div className=" flex px-5 justify-between items-centered w-full">
                <h1 className="text-lg font-semibold">{report.idReporte}</h1>
                <h1 className="text-md text-gray-500">{report.codigo_remitente}</h1>
            </div>
            <hr />
            <ReportCard
                user={report.user}
            />
            <div className="mx-5">
                <h1>Fecha de reporte: {new Date(report.fecha).toLocaleDateString()}</h1>
                <hr />
                <p>
                    {report.descripcion}
                </p>
            </div>
            <div className="flex justify-center p-4">
                <div className="flex space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={handleButtonClick2}
                    >
                        Agregar Strike
                    </button>
                </div>
            </div>
        </div>
    )
}