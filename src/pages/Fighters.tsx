import React, { useEffect, useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import EditFighterModal from '../components/EditFighterModal';
import ViewFighterModal from '../components/ViewFighterModal';
import CreateFighterModal from '../components/CreateFighterModal'

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

const fighterPlaceholder: Fighter = {
    id: 0,
    name: '',
    nickname: '',
    division: '',
    wins: 0,
    losses: 0,
    knockouts: 0,
    submissions: 0,
    gender: '',
    image: ''
};

const Fighters: React.FC = () => {
    const [fighters, setFighters] = useState<Fighter[]>([]);
    const [editFighter, setEditFighter] = useState<Fighter>(fighterPlaceholder);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const itemsPerPage = 4;

    const fetchFighters = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/fighters');
            setFighters(await response.json());
        } catch (error) {
            console.error('Error fetching fighters:', error);
        }
    };

    useEffect(() => {
        fetchFighters();
    }, []);

    const filteredFighters = fighters.filter(
        (fighter) =>
            fighter.name.toLowerCase().includes(search.toLowerCase()) ||
            fighter.nickname.toLowerCase().includes(search.toLowerCase()) ||
            fighter.division.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFighters.length / itemsPerPage);
    const paginatedFighters = filteredFighters.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id: number) => {
        setEditFighter(fighters.find((fighter) => fighter.id === id) || { ...fighterPlaceholder, id });
        setIsDeleteModalOpen(true);
    };

    const handleCreate = () => {
        fetchFighters();
        setCurrentPage(1);
        setIsCreateModalOpen(false);
    };

    const handleEditFighter = () => {
        fetchFighters();
        setCurrentPage(1);
        setIsEditModalOpen(false);
    };

    const handleConfirm = async () => {
        await fetch(`http://localhost:8000/api/fighters/${editFighter.id}`, {
            method: 'DELETE',
        });
        fetchFighters();
        setCurrentPage(1);
        setIsDeleteModalOpen(false);
    };

    return (
<div className="p-6">
    <div className="flex justify-between items-center mb-6">
        <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>
            Crear Peleador
        </button>
        <input
            type="text"
            placeholder="Buscar por nombre, apodo o división..."
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedFighters.map((fighter) => (
            <div
                key={fighter.id}
                className="card bg-white shadow-lg rounded-2xl p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-50"
            >
                <div className="flex flex-col items-center text-center">
                    <img
                        src={fighter.image}
                        alt={fighter.name}
                        className="w-24 h-24 rounded-full border-4 border-blue-400 mb-4"
                        style={{ objectFit: 'cover' }}
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{fighter.name}</h3>
                    <p className="text-sm text-gray-500">{fighter.nickname}</p>
                    <div className="mt-4 flex justify-center space-x-2">
                        <button
                            className="btn btn-info btn-sm text-white hover:bg-blue-700"
                            onClick={() => {
                                setIsViewModalOpen(true);
                                setEditFighter(fighter);
                            }}
                        >
                            Ver
                        </button>
                        <button
                            className="btn btn-warning btn-sm text-white hover:bg-yellow-600"
                            onClick={() => {
                                setIsEditModalOpen(true);
                                setEditFighter(fighter);
                            }}
                        >
                            Editar
                        </button>
                        <button
                            className="btn btn-error btn-sm text-white hover:bg-red-600"
                            onClick={() => handleDelete(fighter.id)}
                        >
                            Borrar
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>

    <div className="flex justify-between items-center mt-6">
        <button
            className="btn btn-outline text-gray-700 hover:bg-gray-200"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
            Anterior
        </button>
        <span className="text-lg font-medium text-gray-700">
            Página {currentPage} de {totalPages}
        </span>
        <button
            className="btn btn-outline text-gray-700 hover:bg-gray-200"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
            Siguiente
        </button>
    </div>

    {isCreateModalOpen && (
        <CreateFighterModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreate} />
    )}

    {isEditModalOpen && (
        <EditFighterModal fighter={editFighter} onClose={() => setIsEditModalOpen(false)} onEdit={handleEditFighter} />
    )}

    {isViewModalOpen && (
        <ViewFighterModal fighter={editFighter} onClose={() => setIsViewModalOpen(false)} />
    )}

    <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
            setIsDeleteModalOpen(false);
            setEditFighter(fighterPlaceholder);
        }}
        onConfirm={handleConfirm}
        message={`¿Estás seguro de eliminar al peleador ${editFighter.name}?`}
    />
</div>


    );
};

export default Fighters;
