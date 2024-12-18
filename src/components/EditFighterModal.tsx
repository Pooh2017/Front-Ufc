import React, { useState } from "react";

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

export interface EditFighterModalProps {
    onClose: () => void;
    onEdit: () => void;
    fighter: Fighter;
}

const EditFighterModal: React.FC<EditFighterModalProps> = ({ onClose, onEdit, fighter }) => {
    const [name, setName] = useState(fighter.name);
    const [nickname, setNickname] = useState(fighter.nickname);
    const [division, setDivision] = useState(fighter.division);
    const [wins, setWins] = useState(fighter.wins);
    const [losses, setLosses] = useState(fighter.losses);
    const [knockouts, setKnockouts] = useState(fighter.knockouts);
    const [submissions, setSubmissions] = useState(fighter.submissions);
    const [gender, setGender] = useState(fighter.gender);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string>(fighter.image || ""); // Inicializa con la foto existente

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setImage(selectedFile.name); // Guarda el nombre del archivo
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("nickname", nickname);
        formData.append("division", division);
        formData.append("wins", wins.toString());
        formData.append("losses", losses.toString());
        formData.append("knockouts", knockouts.toString());
        formData.append("submissions", submissions.toString());
        formData.append("gender", gender);
        formData.append("image", image); // Enviar el nombre del archivo
        formData.append("_method", "PUT");

        if (file) {
            formData.append("image", "/Image/"+file.name); // Enviar el archivo si existe
        }

        const response = await fetch(`http://localhost:8000/api/fighters/${fighter.id}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        onEdit();
    };

    return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-base-200 p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-6">Editar Peleador</h2>

        <div className="space-y-4">
            {/* Nombre */}
            <div className="flex items-center">
                <i className="fas fa-user text-xl mr-2 text-blue-600"></i>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            {/* Apodo */}
            <div className="flex items-center">
                <i className="fas fa-tag text-xl mr-2 text-purple-600"></i>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apodo</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
            </div>

            {/* División */}
            <div className="flex items-center">
                <i className="fas fa-th-large text-xl mr-2 text-green-600"></i>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">División</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                    />
                </div>
            </div>

            {/* Victorias / Derrotas */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <i className="fas fa-trophy text-xl mr-2 text-yellow-600"></i>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Victorias</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={wins}
                            onChange={(e) => setWins(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-times-circle text-xl mr-2 text-red-600"></i>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Derrotas</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={losses}
                            onChange={(e) => setLosses(parseInt(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            {/* Knockouts / Sumisiones */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <i className="fas fa-fist-raised text-xl mr-2 text-red-500"></i>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Knockouts</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={knockouts}
                            onChange={(e) => setKnockouts(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-handshake text-xl mr-2 text-green-500"></i>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sumisiones</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={submissions}
                            onChange={(e) => setSubmissions(parseInt(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            {/* Género */}
            <div className="flex items-center">
                <i className="fas fa-venus-mars text-xl mr-2 text-indigo-600"></i>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                    <select
                        className="select select-bordered w-full"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
            </div>

            {/* Foto */}
            <div className="flex items-center">
                <i className="fas fa-camera text-xl mr-2 text-blue-500"></i>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-primary w-full"
                        onChange={handleFileChange}
                    />
                    {image && (
                        <p className="text-sm mt-2">Archivo seleccionado: {image}</p>
                    )}
                    {fighter.image && (
                        <img
                            src={fighter.image}
                            alt="Foto del peleador"
                            className="mt-2 w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                    )}
                </div>
            </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-between items-center mt-6">
            <button className="btn btn-outline text-red-500 w-1/3" onClick={onClose}>
                <i className="fas fa-times-circle mr-2"></i> Cancelar
            </button>
            <button className="btn btn-primary text-white w-1/3" onClick={handleSubmit}>
                <i className="fas fa-check-circle mr-2"></i> Editar
            </button>
        </div>
    </div>
</div>

    );
};

export default EditFighterModal;
