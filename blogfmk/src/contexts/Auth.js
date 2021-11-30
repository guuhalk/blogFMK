import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

function AuthProvider({children}){
    
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        loadStorage();
    },[]);

    function loadStorage() {
        const storageToken = localStorage.getItem('token');
        if(storageToken){
            setToken(JSON.parse(JSON.stringify(storageToken)));
        }
        setLoading(false); 
    }

    return(
        <AuthContext.Provider value={{logado: !!token, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;