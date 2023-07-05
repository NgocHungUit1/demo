import {LoginClient} from '@/pages/Client/Login'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthGoogle() {
    const { client } = useSelector((st) => st.client);
    if (!client) {
        return <LoginClient />;
    }

    return <Outlet />;
}

export default AuthGoogle;
