import { Route, BrowserRouter, Routes } from "react-router"
import Layout from "./layout/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Vehicles from "./pages/Vehicles"
import Users from "./pages/Users"
import Fighters from "./pages/Fighters"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Fighters />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/fighters" element={<Fighters />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
