import React from "react";
import { Vehiculo } from "../pages/Vehicles";

export interface ViewVehiculoModalProps {
    onClose: () => void;
    vehiculo: Vehiculo;
}

const ViewVehiculoModal: React.FC<ViewVehiculoModalProps> = ({ onClose, vehiculo }) => {
    // Conversión segura a número
    const precioFormateado = Number(vehiculo.precio_dia).toFixed(2);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 max-w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Detalles del Peleador</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Nombre</p>
                        <p>{vehiculo.modelo}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Apodo</p>
                        <p>{vehiculo.marca}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Peso</p>
                        <p>{vehiculo.placa}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Peleas</p>
                        <p>${precioFormateado}</p>
                    </div>
                </div>

                {vehiculo.photo_url && (
                    <div className="mt-4 flex justify-center">
                        <img 
                            src={vehiculo.photo_url} 
                            alt={`Foto de ${vehiculo.modelo}`} 
                            className="w-48 h-48 object-cover rounded-lg"
                        />
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button 
                        className="btn btn-primary" 
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewVehiculoModal;