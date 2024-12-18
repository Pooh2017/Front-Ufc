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
<div className="navbar bg-base-100 shadow-lg">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl font-bold text-blue-600 hover:text-blue-800 transition-all duration-300">UFC</a>
  </div>
  <div className="flex-none gap-2 px-4">
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 space-x-6 text-lg">
        <li className="hover:bg-blue-100 rounded-md transition-all duration-300">
          <Link to="/fighters" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10V3l-5 9v4m0 0l-3 5H4l3-5m7 0l-3 5h3l3-5" />
            </svg>
            <span>Peleadores</span>
          </Link>
        </li>
        <li className="hover:bg-blue-100 rounded-md transition-all duration-300">
          <Link to="/usuarios" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
            <span>Usuarios</span>
          </Link>
        </li>
      </ul>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-blue-300 transition-all duration-300">
        <div className="w-10 rounded-full">
          <img
            alt={user.name}
            src={user.photo_url ?? 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
        <li className="text-xs font-medium text-gray-600">
          <p>{user.name}</p>
        </li>
        <li className="hover:bg-red-100 rounded-md transition-all duration-300">
          <a onClick={logout} className="flex items-center space-x-2 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7l7 7-7 7M7 17l-7-7 7-7" />
            </svg>
            <span>Cerrar sesión</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

    )
}