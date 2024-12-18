import React, { useState } from "react";

export interface Fighter {
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

export interface CreateFighterModalProps {
    onClose: () => void;
    onCreate: () => void;
}

const CreateFighterModal: React.FC<CreateFighterModalProps> = ({ onClose, onCreate }) => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [division, setDivision] = useState("");
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [knockouts, setKnockouts] = useState(0);
    const [submissions, setSubmissions] = useState(0);
    const [gender, setGender] = useState("Masculino");
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");  // Nuevo estado para guardar el nombre del archivo

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setFileName(selectedFile.name);  // Guardar el nombre del archivo
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

        if (file) {
            formData.append("image", "/Image/"+file.name);
        }

        const response = await fetch("http://localhost:8000/api/fighters", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        onCreate();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-base-200 p-4 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Crear Peleador</h2>
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
                    <label className="block mb-1">Apodo</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">División</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">Victorias</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={wins}
                            onChange={(e) => setWins(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Derrotas</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={losses}
                            onChange={(e) => setLosses(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">Knockouts</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={knockouts}
                            onChange={(e) => setKnockouts(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Sumisiones</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={submissions}
                            onChange={(e) => setSubmissions(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Género</label>
                    <select
                        className="select select-bordered w-full"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Foto</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-primary w-full"
                        onChange={handleFileChange}
                    />
                    {fileName && <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {fileName}</p>} {/* Mostrar el nombre del archivo */}
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

export default CreateFighterModal;
