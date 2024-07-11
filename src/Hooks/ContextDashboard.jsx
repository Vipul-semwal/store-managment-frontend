import { DashboardContext } from "../layouts/DashboardLayout/DasboardLayout";
import { useContext } from "react";

const useDashContext = () => {
    const data = useContext(DashboardContext)
    return data
}

export { useDashContext }