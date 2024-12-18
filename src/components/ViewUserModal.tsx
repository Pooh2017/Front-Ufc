import React from "react";
import { User } from "../pages/Users";

export interface ViewUserModalProps {
    onClose: () => void;
    user: User;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ onClose, user }) => {
    return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-base-200 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
            <i className="fas fa-user-circle text-2xl mr-2 text-blue-500"></i>
            Detalles del Usuario
        </h2>

        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <i className="fas fa-user text-blue-500 mr-2"></i>
                Nombre
            </label>
            <p className="p-2 bg-white rounded-lg border border-gray-300 text-sm text-gray-800">{user.name}</p>
        </div>

        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <i className="fas fa-envelope text-blue-500 mr-2"></i>
                Email
            </label>
            <p className="p-2 bg-white rounded-lg border border-gray-300 text-sm text-gray-800">{user.email}</p>
        </div>

        {user.photo && (
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                    <i className="fas fa-camera text-blue-500 mr-2"></i>
                    Foto
                </label>
                <img
                    src={user.photo}
                    alt={`Foto de ${user.name}`}
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
            </div>
        )}

        <div className="flex justify-end mt-6">
            <button
                className="btn btn-primary px-6 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors flex items-center"
                onClick={onClose}
            >
                <i className="fas fa-times mr-2"></i>
                Cerrar
            </button>
        </div>
    </div>
</div>

    );
};

export default ViewUserModal;