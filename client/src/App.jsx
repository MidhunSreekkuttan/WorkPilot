import { Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

import GlobalRoutes from "./routes/GlobalRoutes"
import PageNotFound from "./components/PageNotFound"
import WorkSpaceRoutes from "./routes/WorkSpaceRoutes"

const App = () => {
  return (
    <>

      <ToastContainer />

      <Routes>

        {GlobalRoutes()}

        {WorkSpaceRoutes()}

        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>
  )
}

export default App