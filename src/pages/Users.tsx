import React, { useEffect, useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import Created from '../components/ui/Created';
import ViewUserModal from '../components/ViewUserModal';

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
    const [isViewModallOpen, setIsViewModallOpen] = useState(false);
    const [exito, setExito] = useState({ msg: "Creado con exito", active:false });
    const itemsPerPage = 4;

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
    <button className="btn btn-primary hover:bg-blue-700 transition-all duration-300" onClick={() => setIsCreateModalOpen(true)}>
        Crear usuario
    </button>
    <input
        type="text"
        placeholder="Buscar..."
        className="input input-bordered w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {paginatedUsers.map((user) => (
        <div key={user.id} className="card bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-100">
            <div className="card-body p-4">
                <div className="flex justify-center mb-4">
                    <img
                        src={user.photo}
                        alt={user.name}
                        className="rounded-full w-20 h-20"
                    />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{user.name}</h3>
                <p className="text-center text-gray-600">{user.email}</p>

                <div className="flex justify-between mt-4">
                    <button 
                        className="btn btn-info btn-sm hover:bg-blue-500 transition-all duration-300"
                        onClick={() => { 
                            setIsViewModallOpen(true); 
                            setEditUser(user); 
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        Ver
                    </button>
                    <button 
                        className="btn btn-warning btn-sm hover:bg-yellow-500 transition-all duration-300"
                        onClick={() => { 
                            setIsEditModalOpen(true); 
                            setEditUser(user); 
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
                        </svg>
                        Editar
                    </button>
                    <button
                        className="btn btn-error btn-sm hover:bg-red-500 transition-all duration-300"
                        onClick={() => handleDelete(user.id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-7 7-7-7" />
                        </svg>
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    ))}
</div>

<div className="flex justify-between items-center mt-4">
    <button
        className="btn btn-outline hover:bg-blue-100 transition-all duration-300"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    >
        Anterior
    </button>
    <span className="font-medium text-gray-700">
        Página {currentPage} de {totalPages}
    </span>
    <button
        className="btn btn-outline hover:bg-blue-100 transition-all duration-300"
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

{isViewModallOpen && (
    <ViewUserModal 
        user={editUser} 
        onClose={() => setIsViewModallOpen(false)} 
    />
)}

<ConfirmationModal
    isOpen={isDeleteModallOpen}
    onClose={() => {
        setIsDeleteModalOpen(false);
        setEditUser({ id: 0, name: '', email: '', photo: '', password: '' });
    }}
    onConfirm={handleConfirm}
    message={"¿Quieres eliminar al usuario " + editUser.name + "?"}
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