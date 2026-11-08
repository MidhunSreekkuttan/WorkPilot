import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"

import GlobalRoutes from "./routes/GlobalRoutes"
import PageNotFound from "./components/PageNotFound"
import LoadingScreen from "./components/LoadingScreen"
import WorkSpaceRoutes from "./routes/WorkSpaceRoutes"

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen message="Synchronizing Telemetry..." />}>
        <Routes>

          {GlobalRoutes()}

          {WorkSpaceRoutes()}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App