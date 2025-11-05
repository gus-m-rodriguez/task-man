import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";

import axios from "../api/axios";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState(null);

    const signin = async (data) => {
        try {
            const res = await axios.post("/signin", data);
            console.log(res.data);
            setUser(res.data);
            setIsAuth(true);
            return res.data;
        } catch (error) {
            console.log(error);
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }
    const signup = async (data) => {
       try {
           const res = await axios.post('/signup', data);
            setUser(res.data);
            setIsAuth(true);
            return res.data;
        } catch (error) {
            console.log(error);
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const signout = async () => {
        const res = await axios.post("/signout");
        setUser(null);
        setIsAuth(false);
        return res.data;
    }


    useEffect(() => {
        if (Cookie.get("token")) {
            axios.get("/profile")
                .then((res) => {
                    setUser(res.data);
                    setIsAuth(true);
                })
                .catch((err) => {
                    console.log(err);
                    setUser(null);
                    setIsAuth(false);
                });
        }
    }, []);

    return <authContext.Provider value={{ user, isAuth, errors, signup, setUser, signin, signout, setErrors }}>
        {children}
    </authContext.Provider>
}