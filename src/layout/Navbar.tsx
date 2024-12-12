import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ photo_url: '', name: '' });

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user') || ''));
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Proyecto Web</a>
            </div>
            <div className="flex-none gap-2 px-4">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/usuarios">Usuarios</Link></li>
                        <li><Link to="/">Vehiculos 🚙</Link></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt={user.name}
                                src={user.photo_url ?? 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <p className="text-xs">{user.name}</p>
                        </li>
                        <li><a onClick={logout} >Cerrar sesion</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}