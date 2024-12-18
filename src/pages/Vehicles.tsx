import React, { useEffect, useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import CreateVehiculoModal from '../components/CreateVehiculoModal';
import EditVehiculoModal from '../components/EditVehiculoModal';
import ViewVehiculoModal from '../components/ViewVehiculoModal';


export interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    placa: string;
    photo_url: string;
    precio_dia: number;
}

const vehiculoPlaceholder = { id: 0, marca: '', modelo: '', placa: '', photo_url: '', precio_dia: 0 }

const Vehiculos: React.FC = () => {
    const [users, setUsers] = useState<Vehiculo[]>([]);
    const [editUser, setEditUser] = useState<Vehiculo>(vehiculoPlaceholder);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModallOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModallOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModallOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModallOpen, setIsViewModallOpen] = useState(false);

    const itemsPerPage = 2;

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/vehiculos');
            setUsers(await response.json());
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            user.marca.toLowerCase().includes(search.toLowerCase()) ||
            user.modelo.toLowerCase().includes(search.toLowerCase()) ||
            user.placa.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id: number) => {
        setEditUser(users.find((user) => user.id === id) || { ...vehiculoPlaceholder, id });
        setIsDeleteModalOpen(true);
    };

    const handleCreate = () => {
        fetchUsers();
        setCurrentPage(1);
        setIsCreateModalOpen(false);
    };

    const handleEditUser = () => {
        fetchUsers();
        setCurrentPage(1);
        setIsEditModalOpen(false);
    };


    const handleConfirm = async () => {
        await fetch(`http://localhost:8000/api/vehiculos/${editUser.id}`, {
            method: 'DELETE',
        });
        fetchUsers();
        setCurrentPage(1);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="p-4">

            <div className="flex justify-between items-center mb-4">
                <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>
                    Crear Peleador
                </button>
                <input
                    type="text"
                    placeholder="Buscar modelo, marca, placa..."
                    className="input input-bordered w-full max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apodo</th>
                            <th>Peso</th>
                            <th>Peleas</th>
                            <th>Foto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.modelo}</td>
                                <td>{user.marca}</td>
                                <td>{user.placa}</td>
                                <td>{user.precio_dia}</td>
                                <td>
                                    <img
                                        src={user.photo_url}
                                        alt={user.modelo}
                                        className="rounded-full w-10 h-10"
                                    />
                                </td>
                                <td>
                                    <div className="flex space-x-2">
                                    <button 
                                            className="btn btn-info btn-sm" 
                                            onClick={() => { 
                                                console.log('Abriendo modal', user);
                                                setIsViewModallOpen(true); 
                                                setEditUser(user); 
                                            }}
                                        >
                                            Ver
                                        </button>
                                        <button className="btn btn-warning btn-sm"
                                            onClick={() => { setIsEditModalOpen(true); setEditUser(user); }}
                                        >Editar</button>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Borrar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="btn btn-outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Anterior
                </button>
                <span>
                    Pagina {currentPage} de {totalPages}
                </span>
                <button
                    className="btn btn-outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Siguiente
                </button>
            </div>

            {isCreateModallOpen && (
                <CreateVehiculoModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreate} />
            )}

            {isEditModallOpen && (
                <EditVehiculoModal vehiculo={editUser} onClose={() => setIsEditModalOpen(false)} onCreate={handleEditUser} />
            )}

            {isViewModallOpen && (
                <ViewVehiculoModal 
                    vehiculo={editUser} 
                    onClose={() => setIsViewModallOpen(false)} 
                />
            )}


            <ConfirmationModal
                isOpen={isDeleteModallOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setEditUser(vehiculoPlaceholder);
                }}
                onConfirm={handleConfirm}
                message={"Quieres eliminar al peleador " + editUser.marca + + " " + editUser.modelo + " ?"}
            />
        </div>
    );
};

const Vehicles = () => {
    return (
        <>
            <Vehiculos />
        </>
    )
}

export default Vehicles;