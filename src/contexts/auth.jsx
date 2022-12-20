import React, { useState, useEffect, createContext } from "react";
// useEffect roda todas as vezes que a aplicação inicializa
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    const [showModalVisibility, setShowModalVisibility] = useState(false)
    const [showOldModal, setShowOldModal] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [initialToken, setInitialToken] = useState(localStorage.getItem("token"))
    const [typeUser, setTypeUser] = useState(localStorage.getItem("typeUser"));
    const [config, setConfig] = useState({headers: {Authorization: `Bearer ${token}`}})
    const [userRequests, setUserRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [devices, setDevices] = useState([]);
    const [locations, setLocations] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [block, setBlock] = useState();

    const [checkedLocations, setCheckedLocations] = useState([]);
    const [checkedSpaces, setCheckedSpaces] = useState([]);

    const [showMakeOpModal, setShowMakeOpModal] = useState(false);
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
       

        if(recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        setConfig({headers: {Authorization: `Bearer ${token}`}})
    }, [token])

    function HandleTimeout() {
        setLoading(false)
        clearTimeout();
    }

   async function HandleLogin(email, password, setEmailId, setPasswordId){
        // console.log(email, password)

        if (email === '' && password === '') {
            toast.error("Preencha os dados para realizar login", {className:"error-toast"});
            setEmailId('input-error');
            setPasswordId('input-error');
            setLoading(false);

            
        } else if (email === '' && !(password === '')) {
            toast.error("Insira o e-mail para realizar login", {className:"error-toast"});
            setEmailId('input-error');
            setPasswordId('');
            setLoading(false);


        } else if (password === '' && !(email === '')) {
            toast.error("Insira a senha para realizar login", {className:"error-toast"});
            setEmailId('');
            setPasswordId('input-error');
            setLoading(false);

        } else {

            setLoading(true);

            setTimeout(HandleTimeout, 5000);

            await api.post("/auth/login", {email, password}).then(res=> {
                console.log(res.data)
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("id", res.data.user._id);
                localStorage.setItem("typeUser", res.data.user.typeUser);
                setUser(res.data.user)
                localStorage.setItem("token", res.data.token);
                setInitialToken(localStorage.getItem("token"));
                setTypeUser(localStorage.getItem("typeUser"));
                setToken(res.data.token)
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
                
                //setTimeout(HandleTimeout, 5000);

                //verficiar se o timeout realmente esta funcionando
                
            }).then(function (response) {
                setLoading(false);
                navigate("/dashboard");
    
            }).catch(function (error) {
    
                if(error.response.status === 404 || !error.response.status) {
                    toast.error("Ocorreu um erro de conexão ao serviço", {className:"error-toast"});
                    setLoading(false);
                    // console.log(error.response.status)

                } else {
                    setEmailId('input-error');
                    setPasswordId('input-error');                    
                    toast.error("E-mail e/ou senha errados. Verifique se estão corretos e tente novamente.", {className:"error-toast"})
                    setLoading(false);
                    // console.log(email, password)
                    // console.log(error.response.status)
                }
            })
        }
    }
    //back envia resposta, se eu nao receber resposta o serviço está indisponível

    const logout = () => {

        try {
            
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            api.defaults.headers.Authorization = null;
        
            setUser();
            navigate("/");
            window.location.reload();
            console.log("ok ", user);
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <AuthContext.Provider
        value={{ authenticated: !!user, user, loading, setLoading, logout, token, setToken, initialToken, typeUser, HandleLogin, config, setConfig, userRequests, setUserRequests, users, setUsers, locations, setLocations, spaces, setSpaces, block, setBlock, categories, setCategories, showModalVisibility, setShowModalVisibility, showOldModal, setShowOldModal, checkedLocations, setCheckedLocations, checkedSpaces, setCheckedSpaces, showMakeOpModal, setShowMakeOpModal, showPermissionsModal, setShowPermissionsModal, devices, setDevices }}
        >
            {children}

        </AuthContext.Provider>
    )
}
