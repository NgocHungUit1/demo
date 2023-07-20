import { Routes, Route } from "react-router-dom"

import DefaultLayout from "@/layouts/DefaultLayout"
import Dashboards from "@/pages/Admin/Dashboards"
import Categories from "@/pages/Admin/Categories"
import Genres from "@/pages/Admin/Genres"
import Comics from "@/pages/Admin/Comics"
import Chapter from "@/pages/Admin/Chapter"
import InserChapter from "@/pages/Admin/Chapter/create"
import CustomerInsertChapter from "@/pages/Client/CustomerUpload/Chapter/create"
import InsertComic from "@/pages/Admin/Comics/create"
import ViewChapter from "@/pages/Admin/Chapter/view"
import EditComic from "@/pages/Admin/Comics/edit"
import ComicCustomer from "@/pages/Admin/ComicCustomer"
import AdminLayout from "@/layouts/AdminLayout"
import Home from "@/pages/Client/Home"
import Auth from "./Auth"
import Manga from "@/pages/Client/Manga"
import CustomerChapter from "@/pages/Client/CustomerUpload/Chapter"
import CustomerUpload from "@/pages/Client/CustomerUpload"
import CustomerViewChapter from "@/pages/Client/CustomerUpload/Chapter/view"
import CustomerInsert from "@/pages/Client/CustomerUpload/create"
import CustomerEdit from "@/pages/Client/CustomerUpload/edit"
import ChapterView from "@/pages/Client/ChapterView"
import LoginClient from "@/pages/Client/Login"
import GoogleCallback from "@/pages/Client/Login/GoogleCallback"
import { useDispatch } from "react-redux"
import { setClient } from "@/store/Slice/client.slice"
import { useEffect } from "react"
import Browse from "@/pages/Client/Browse"
import Follow from "@/pages/Client/Follow"

export const RoutesConfig = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    var user = localStorage.getItem("clientData")
    if (user) {
      dispatch(setClient(JSON.parse(user)))
    }
  }, [])
  return (
    <Routes>
      <Route path="/admin" element={<Auth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboards />}></Route>
          <Route path="users" element={<Categories />}></Route>
          {/* <Route
                        path="all-categories"
                        element={<Categories />}
                    ></Route> */}

          <Route path="all-genres" element={<Genres />}></Route>
          <Route path="all-comics" element={<Comics />}>
            {/* <Route path="login" element={<Login />}></Route> */}
          </Route>
          <Route path="all-comics-customer" element={<ComicCustomer />}>
            {/* <Route path="login" element={<Login />}></Route> */}
          </Route>
          <Route path="insert-comic" element={<InsertComic />} />
          <Route path="edit-comic/:id" element={<EditComic />} />

          <Route path="chapter/:id" element={<Chapter />} />
          <Route path="insert-chapter/:id" element={<InserChapter />} />
          <Route path="view-chapter/:id" element={<ViewChapter />} />
        </Route>
      </Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" index element={<Home />}></Route>
        <Route path="manga-details/:slug" element={<Manga />}></Route>
        <Route path="/browse" element={<Browse />}></Route>
        <Route path="/follow" element={<Follow />}></Route>
        <Route path="/customer-upload" element={<CustomerUpload />}></Route>
        <Route
          path="/customer-upload-manga"
          element={<CustomerInsert />}
        ></Route>
        <Route
          path="/customer/edit-comic/:id"
          element={<CustomerEdit />}
        ></Route>
        <Route
          path="/customer/chapter/:id"
          element={<CustomerChapter />}
        ></Route>
        <Route path="/customer/view-chapter/:id" element={<CustomerViewChapter />} />
        <Route path="/customer/insert-chapter/:id" element={<CustomerInsertChapter />} />
      </Route>
      <Route
        path="/manga-details/:slug/:slug_chapter/:id"
        element={<ChapterView />}
      ></Route>
      

      <Route path="/login" exact element={<LoginClient />}></Route>
      <Route path="/auth/google" exact element={<GoogleCallback />}></Route>
    </Routes>
  )
}
