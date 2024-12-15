import React, { useEffect, useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import Created from '../components/ui/Created';

export interface User {
    id: number;
    name: string;
    email: string;
    photo: string;
    password: string;
}

interface UserApi {
    id: number;
    name: string;
    email: string;
    photo_url: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editUser, setEditUser] = useState<User>({ id: 0, name: '', email: '', photo: '', password: '' });
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModallOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModallOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModallOpen, setIsDeleteModalOpen] = useState(false);
    const [exito, setExito] = useState({ msg: "Creado con exito", active:false });
    const itemsPerPage = 2;

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/users');
            const data = await response.json();
            const formattedUsers = data.map((user: UserApi) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                photo: user.photo_url,
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id: number) => {
        setEditUser(users.find((user) => user.id === id) || { id: id, name: '', email: '', photo: '', password: '' });
        setIsDeleteModalOpen(true);
    };

    const handleCreateUser = () => {
        fetchUsers();
        setCurrentPage(1);
        setIsCreateModalOpen(false);
        setExito({ msg: "Usuario creado con exito" , active: true});
    };

    const handleEditUser = () => {
        fetchUsers();
        setCurrentPage(1);
        setIsEditModalOpen(false);
    };

    const handleConfirm = async () => {
        await fetch(`http://localhost:8000/api/users/${editUser.id}`, {
            method: 'DELETE',
        });
        fetchUsers();
        setCurrentPage(1);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="p-4">

            {exito.active && (<Created/>)}
            
            <div className="flex justify-between items-center mb-4">
                <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>
                    Crear usuario
                </button>
                <input
                    type="text"
                    placeholder="Search..."
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
                            <th>Email</th>
                            <th>Foto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="rounded-full w-10 h-10"
                                    />
                                </td>
                                <td>
                                    <div className="flex space-x-2">
                                        <button className="btn btn-info btn-sm">Ver</button>
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
                <CreateUserModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateUser} />
            )}

            {isEditModallOpen && (
                <EditUserModal user={editUser} onClose={() => setIsEditModalOpen(false)} onCreate={handleEditUser} />
            )}

            <ConfirmationModal
                isOpen={isDeleteModallOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setEditUser({ id: 0, name: '', email: '', photo: '', password: '' });
                }}
                onConfirm={handleConfirm}
                message={"Quieres eliminar al usuario " + editUser.name + " ?"}
            />
        </div>
    );
};

const Users = () => {
    return (
        <>
            <UserTable />
        </>
    )
}

export default Users;