import { Routes } from "react-router-dom"
import GlobalRoutes from "./routes/GlobalRoutes"

const App = () => {
  return (
    <>
      <Routes>
        {GlobalRoutes()}
      </Routes>
    </>
  )
}

export default App