import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";
import Dashboards from "@/pages/Dashboards";
import Categories from "@/pages/Categories";
import Genres from "@/pages/Genres";
import Comics from "@/pages/Comics";
import Login from "@/pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./Auth";

export const RoutesConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />}>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" index element={<Dashboards />}></Route>
                    <Route
                        path="/all-categories"
                        element={<Categories />}
                    ></Route>
                    <Route path="/all-genres" element={<Genres />}></Route>
                    <Route path="/all-comics" element={<Comics />}></Route>
                </Route>
            </Route>
        </Routes>
    );
};
