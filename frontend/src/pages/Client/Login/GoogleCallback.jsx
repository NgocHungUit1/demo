import { setClient } from "@/store/Slice/client.slice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function GoogleCallback() {
    const [data, setData] = useState({});
    const location = useLocation();
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            fetch(`http://localhost:8000/api/auth/callback${location.search}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    localStorage.setItem("clientData", JSON.stringify(data.user));
                    dispatch(setClient(data.user));
                });

            const timeout = setTimeout(() => {
                setIsVisible(false);
                navigate("/");
            }, 2000);

            return () => clearTimeout(timeout);
        }
        fetchData();
    }, []);


    return (
        <div>{isVisible ? data ? <p>redirect....</p> : <p>error</p> : ""}</div>
    );
}

export default GoogleCallback;
