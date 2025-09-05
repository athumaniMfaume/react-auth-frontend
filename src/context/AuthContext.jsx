import React, {createContext, useContext, useEffect,useState} from 'react'
import api from '../api/api';

const AuthContext = createContext();

export  const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        checkAuth();
    },[]);

    const checkAuth = async () => {
        const token = localStorage.getItem('myapptoken');

        if (token) {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                console.log(error);
                localStorage.removeItem('myapptoken');
                delete api.defaults.headers.common['Authorization']; 
            }
            
        }

        setLoading(false);
    };

    const updateAuthState = (token,userData) =>{
        localStorage.setItem('myapptoken',token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
    };  

    const clearAuthState = () =>{
        localStorage.removeItem('myapptoken');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    }; 


  return (
    <AuthContext.Provider value={{user, updateAuthState, loading, checkAuth, clearAuthState}}>
        {children}
    </AuthContext.Provider>
  );

};

export  const useAuth = ()=> useContext(AuthContext);




