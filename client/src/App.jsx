import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"

const App = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  )
}

export default App