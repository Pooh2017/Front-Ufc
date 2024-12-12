import React, { useState } from "react";

export interface CreateVehiculoModalProps {
    onClose: () => void;
    onCreate: () => void;
}

const CreateVehiculoModal: React.FC<CreateVehiculoModalProps> = ({ onClose, onCreate }) => {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [placa, setPlaca] = useState('');
    const [precioDia, setprecioDia] = useState(0);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('modelo', modelo);
        formData.append('marca', marca);
        formData.append('placa', placa);
        formData.append('precio_dia', precioDia.toString());

        if (file) {
            formData.append('foto', file);
        }

        const result = await fetch('http://localhost:8000/api/vehiculos', {
            method: 'POST',
            body: formData,
        });

        await result.json();

        onCreate();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-base-200 p-4 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Crear vehiculo</h2>
                <div className="mb-4">
                    <label className="block mb-1">Modelo</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Marca</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Placas</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Precio al dia</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={precioDia}
                        onChange={(e) => setprecioDia(parseInt(e.target.value))}
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

export default CreateVehiculoModal;