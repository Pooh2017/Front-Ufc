import { Link, Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
    return <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
            <Navbar />
            <div className="p-6">
                <Outlet />
            </div>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 min-h-full w-64 p-4">
                <li><Link to="/usuarios">Usuarios</Link></li>
                <li><Link to="/">Vehiculos</Link></li>
            </ul>
        </div>
    </div>
}

export default Layout;