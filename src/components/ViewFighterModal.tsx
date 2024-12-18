import React from "react";
import { FaTrophy, FaFistRaised, FaFutbol, FaUser, FaMars, FaImage } from 'react-icons/fa'
export interface Fighter {
    id: number;
    name: string;
    nickname: string;
    division: string;
    wins: number;
    losses: number;
    knockouts: number;
    submissions: number;
    gender: string;
    image: string;
}

export interface ViewFighterModalProps {
    onClose: () => void;
    fighter: Fighter;
}

const ViewFighterModal: React.FC<ViewFighterModalProps> = ({ onClose, fighter }) => {
    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-base-200 p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto shadow-lg border-2 border-blue-500">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Biografía del Peleador</h2>
                
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <FaUser className="text-blue-500 mr-2" />
                        <label className="block text-gray-700 font-semibold">Nombre</label>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                        value={fighter.name}
                        readOnly
                    />
                </div>
        
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <FaFutbol className="text-blue-500 mr-2" />
                        <label className="block text-gray-700 font-semibold">Apodo</label>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                        value={fighter.nickname}
                        readOnly
                    />
                </div>
        
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <FaTrophy className="text-yellow-500 mr-2" />
                        <label className="block text-gray-700 font-semibold">División</label>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                        value={fighter.division}
                        readOnly
                    />
                </div>
        
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="flex items-center mb-4">
                            <FaFistRaised className="text-green-500 mr-2" />
                            <label className="block text-gray-700 font-semibold">Victorias</label>
                        </div>
                        <input
                            type="number"
                            className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                            value={fighter.wins}
                            readOnly
                        />
                    </div>
                    <div>
                        <div className="flex items-center mb-4">
                            <FaFistRaised className="text-red-500 mr-2" />
                            <label className="block text-gray-700 font-semibold">Derrotas</label>
                        </div>
                        <input
                            type="number"
                            className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                            value={fighter.losses}
                            readOnly
                        />
                    </div>
                </div>
        
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="flex items-center mb-4">
                            <FaFistRaised className="text-purple-500 mr-2" />
                            <label className="block text-gray-700 font-semibold">Knockouts</label>
                        </div>
                        <input
                            type="number"
                            className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                            value={fighter.knockouts}
                            readOnly
                        />
                    </div>
                    <div>
                        <div className="flex items-center mb-4">
                            <FaFistRaised className="text-pink-500 mr-2" />
                            <label className="block text-gray-700 font-semibold">Sumisiones</label>
                        </div>
                        <input
                            type="number"
                            className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                            value={fighter.submissions}
                            readOnly
                        />
                    </div>
                </div>
        
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <FaMars className="text-blue-400 mr-2" />
                        <label className="block text-gray-700 font-semibold">Género</label>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow-sm"
                        value={fighter.gender}
                        readOnly
                    />
                </div>
        
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <FaImage className="text-blue-300 mr-2" />
                        <label className="block text-gray-700 font-semibold">Foto</label>
                    </div>
                    {fighter.image && (
                        <img
                            src={fighter.image}
                            alt="Foto del peleador"
                            className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md border-2 border-blue-400"
                        />
                    )}
                </div>
        
                <div className="flex justify-end">
                    <button className="btn btn-outline hover:bg-blue-500 transition-all duration-300 text-blue-500" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default ViewFighterModal;
