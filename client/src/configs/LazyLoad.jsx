import { Suspense } from "react"
import LoadingScreen from "../components/LoadingScreen"

const LazyLoad = ({ children }) => {
    return (
        <Suspense fallback={<LoadingScreen message="Synchronizing Telemetry..." />}>
            {children}
        </Suspense>
    )

}

export default LazyLoad