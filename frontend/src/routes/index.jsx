import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";
import Dashboards from "@/pages/Admin/Dashboards";
import Categories from "@/pages/Admin/Categories";
import Genres from "@/pages/Admin/Genres";
import Comics from "@/pages/Admin/Comics";
import Chapter from "@/pages/Admin/Chapter";
import InserChapter from "@/pages/Admin/Chapter/create";
import InsertComic from "@/pages/Admin/Comics/create";
import ViewChapter from "@/pages/Admin/Chapter/view";
import EditComic from "@/pages/Admin/Comics/edit";
import Login from "@/pages/Admin/Login";
import AdminLayout from "@/layouts/AdminLayout";
import Home from "@/pages/Client/Home"
import { useDispatch, useSelector } from "react-redux";
import Auth from "./Auth";

export const RoutesConfig = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Auth />}>
                <Route element={<AdminLayout />}>
                    <Route index element={<Dashboards />}></Route>
                    <Route
                        path="all-categories"
                        element={<Categories />}
                    ></Route>

                    <Route path="all-genres" element={<Genres />}></Route>
                    <Route path="all-comics" element={<Comics />}>
                        {/* <Route path="login" element={<Login />}></Route> */}
                    </Route>
                    <Route path="insert-comic" element={<InsertComic />} />
                    <Route path="edit-comic/:id" element={<EditComic />} />

                    <Route path="chapter/:id" element={<Chapter />} />
                    <Route
                        path="insert-chapter/:id"
                        element={<InserChapter />}
                    />
                    <Route path="view-chapter/:id" element={<ViewChapter />} />
                </Route>
            </Route>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" index element={<Home />}></Route>
            </Route>
        </Routes>
    );
};
