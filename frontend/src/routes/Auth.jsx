import Login from "@/pages/Admin/Login";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Auth() {
    const { user } = useSelector((st) => st.user);
    if (!user) {
        return <Login />;
    }

    return <Outlet />;
}

export default Auth;
