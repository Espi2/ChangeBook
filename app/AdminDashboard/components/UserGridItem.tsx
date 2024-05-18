'use-client';

import Image from "next/image";
import { SeedProduct } from "../interfaces/interfaces"
import { useState } from "react";

interface Props {
    product: SeedProduct;
}

export const UserGridItem = ({ product }: Props) => {

    const [response1, setResponse1] = useState(null);
    const [response2, setResponse2] = useState(null);

    const handleButtonClick1 = async () => {
        try {
            // const response = await fetch(`/api/endpoint1/${product.codigo}`, {
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
            // const response = await fetch(`/api/endpoint2/${product.codigo}`, {
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
            <Image
                // src="/libro_morado.png" // Ruta de la imagen (ajústala según sea necesario)
                src={`/${product.imagenCredencial}`}
                alt={product.nombre}
                className="w-full object-cover"
                width={500}
                height={500}
            />
            <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold">{product.nombre}</h3>
                <h3 className="text-md text-gray-500">{product.codigo}</h3>
            </div>
            <div className="flex justify-center p-4">
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleButtonClick1}
                    >
                        Aceptar
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={handleButtonClick2}
                    >
                        Declinar
                    </button>
                </div>
            </div>
        </div>
    )
}