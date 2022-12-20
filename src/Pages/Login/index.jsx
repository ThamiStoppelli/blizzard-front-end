import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

import "./style.css"
import Logo from "../../assets/Logo.png"
import about from "../../assets/Group7.png"
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';
import PasswordInput from '../../components/PasswordInput';

export default function Login() {

    const { HandleLogin, setLoading, loading } = useContext(AuthContext);

    let navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailId, setEmailId] = useState("");
    const [passwordId, setPasswordId] = useState("");
    const [togglePassword, setTogglePassword] = useState(false);

    async function HandleSubmit(field) {
        field.preventDefault()
        setLoading(true)
        await HandleLogin(email, password, setEmailId, setPasswordId)
    }

    const handleInputFocus = () => {

        setLoading(false)
        setEmailId('');
        setPasswordId('');
    }

    useEffect(() => {
        console.log(localStorage.getItem("user"));

    }, []);

    return (
        <div className="container">
            <div className="login-container">
                <div className="login-wrapper">

                    <img src={Logo} alt="Blizzard_Logo" title='Blizzard_Logo' />

                    <form onSubmit={(field) => HandleSubmit(field)}>

                        <p className="subtitle">Faça login com a sua conta.</p>

                        <div className='form-wrapper'>

                            <label>E-mail</label>
                            <input
                                id={emailId}
                                type="email"
                                value={email}
                                onChange={(field) => setEmail(field.target.value)}
                                onFocus={handleInputFocus}
                            />

                            <label>Senha</label>
                            <PasswordInput          
                                id={passwordId}
                                toggle={togglePassword}
                                setInput={setPassword}
                                maxLength={50}
                                isPassword={true}
                                setToggle={setTogglePassword}
                                value={password}
                                onChange={(field) => setPassword(field.target.value)}
                                onFocus={handleInputFocus}
                            />

                            <div className='form-options'>
                                {/* <section>
                                    <input type='checkbox' id='remainConected' name='remainConected' />
                                    <label for='remainConected'>Permanecer Conectado</label>
                                </section> */}
                                <section/>

                                <div className='forgot-password'>
                                    <a onClick={() => { navigate('/senha/recuperar') }}>Esqueceu a senha?</a>
                                </div>
                            </div>

                        </div>

                        <button type="submit">{loading ? <Loading/> : 'Entrar'}</button>

                        <div className="text-option">
                            <span>Não possui uma conta? <a href="" onClick={() => { navigate('/cadastrar') }}>Criar aqui!</a></span>
                        </div>

                    </form>

                    <button className="about-button" onClick={() => { navigate('/sobre') }}>
                        <img src={about} />
                    </button>

                </div>
            </div>
        </div>


    )
}