import React, { useState } from "react";
import { User } from "../pages/Users";

export interface EditUserModalProps {
    onClose: () => void;
    onCreate: () => void;
    user: User;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ onClose, onCreate, user }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string>(user.photo || "");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setImage(selectedFile.name); // Guarda el nombre del archivo
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append("foto", image);
        formData.append('_method', 'PUT');

        if (file) {
            formData.append("image", "/Image/"+file.name);
        }

        const result = await fetch('http://localhost:8000/api/users/' + user.id, {
            method: 'POST',
            body: formData,
        });

        const data = await result.json();
        console.log(data);

        onCreate();
    };


    return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-base-200 p-6 rounded-lg w-full max-w-md shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
            <i className="fas fa-user-edit text-2xl mr-2 text-blue-500"></i>
            Editar Usuario
        </h2>

        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <i className="fas fa-user text-blue-500 mr-2"></i>
                Nombre
            </label>
            <input
                type="text"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa el nombre"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <i className="fas fa-envelope text-blue-500 mr-2"></i>
                Email
            </label>
            <input
                type="email"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa el email"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                <i className="fas fa-camera-retro text-blue-500 mr-2"></i>
                Foto
            </label>
            <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
            />
        </div>

        <div className="flex justify-between space-x-4 mt-6">
            <button
                className="btn btn-outline btn-secondary hover:bg-gray-200 transition-all duration-300 flex items-center"
                onClick={onClose}
            >
                <i className="fas fa-times mr-2"></i>
                Cancelar
            </button>
            <button
                className="btn btn-primary hover:bg-blue-600 transition-all duration-300 flex items-center"
                onClick={handleSubmit}
            >
                <i className="fas fa-save mr-2"></i>
                Editar
            </button>
        </div>
    </div>
</div>

    );
};

export default EditUserModal;