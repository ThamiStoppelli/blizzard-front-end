import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api'
import Logo from "../../assets/Logo.png"
import Loading from '../../components/Loading';

import "./style.css"
import 'react-toastify/dist/ReactToastify.css';

export default function PasswordRecovery() {

    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailId, setEmailId] = useState("");

    const handleSendEmail = async (field) => {

        field.preventDefault()

        if (email === '') {
            toast.error("Preencha o campo do e-mail", {className:"error-toast"});
            setEmailId('input-error');
            
        } else {
            setLoading(true);
    
            api.post("/auth/forgotPassword", {
                email: email,
            }).then(function (response) {
                if(response.status === 200) {
                    setLoading(false);
                    console.log(response)
                    navigate('/') 
                    toast.success("Caso este e-mail esteja cadastrado, cheque sua caixa de entrada", {className:"success-toast"});
                }
                }).catch(function (error) {

                if(error.response.status === 404 || !error.response.status) {
                    setLoading(false);
                    console.log(error)
                    toast.error("Ocorreu um erro de conexão ao serviço", {className:"error-toast"});

                } else {
                    setLoading(false);  
                    console.log(error)
                    navigate('/')
                    toast.success("Caso este e-mail esteja cadastrado, cheque sua caixa de entrada", {className:"success-toast"});
                }
            }); 
        }
    };

    const handleInputFocus = (field) => {

        setEmailId('');
    }

    return (
        <div className="container">
            <div className="login-container">
                <div className="login-wrapper">

                    <img src={Logo} alt="Blizzard_Logo" title='Blizzard_Logo' />

                    <form onSubmit={(e) => handleSendEmail(e)}>
                        <div className="form-wrapper" id="recovery">
                            
                            <span className="form-title">Recuperação de senha</span>
                            <span className="form-text">
                                Insira seu e-mail cadastrado abaixo para que possamos enviar um e-mail de recuperação de senha.
                            </span>

                            <label>E-mail</label>
                            <input
                                id={emailId}
                                type="email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={handleInputFocus}

                            />
                        </div>
                        
                        <button id="recovery-button"> 
                                {loading ? <Loading/> : 'Enviar'}</button>

                        <div className="text-option">
                            <span>Lembrou da sua senha? <a href="" onClick={() => { navigate('/') }}>Entre aqui!</a></span>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}