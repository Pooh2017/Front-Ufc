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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);

        if (file) {
            console.log('file', file);

            formData.append('foto', file);
        }

        const body = file ? formData : JSON.stringify({ name, email });

        const result = await fetch('http://localhost:8000/api/users/' + user.id + '/edit', {
            method: 'POST',
            body,
        });

        const data = await result.json();
        console.log(data);

        onCreate();
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-base-200 p-4 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Editar usuario</h2>
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
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;