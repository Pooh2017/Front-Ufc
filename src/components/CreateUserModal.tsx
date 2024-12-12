import React, { useState } from "react";
import { User } from "../pages/Users";
import Created from "./ui/Created";

export interface CreateUserModalProps {
    onClose: () => void;
    onCreate: (newUser: User) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [exito, setExito] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', password);

        if (file) {
            formData.append('foto', file);
        }

        const result = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            body: formData,
        });

        const data = await result.json();

        onCreate(data.user);
        setExito(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            {exito && (<Created />)}
            <div className="bg-base-200 p-4 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Crear usuario</h2>
                <div className="mb-4">
                    <label className="block mb-1">Nombre</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña</label>
                    <input
                        type="text  "
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Foto</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        onChange={handleFileChange}
                    />

                </div>
                <div className="flex justify-end space-x-2">
                    <button className="btn btn-outline" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Crear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModal;