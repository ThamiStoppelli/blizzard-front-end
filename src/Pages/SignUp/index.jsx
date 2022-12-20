import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api'
import PasswordInput from '../../components/PasswordInput';
import Logo from "../../assets/Logo.png"

import "./style.css"
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

    const [data, setData] = useState(newData);
    const [nameId, setNameId] = useState('');
    const [emailId, setEmailId] = useState('');
    const [passwordId, setPasswordId] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

    function newData() {
        return {
            name: '',
            email: '',
            password: '',
        }
    }

    function handleChange(field) {
        const { name, value } = field.target;
        setData({ ...data, [name]: value })
        console.log(field.target.value)
        data.password = password;
        console.log(data.password)
        // console.log(password)
    }

    function handleSubmit(field) {
        field.preventDefault();

        if (data.name === '' && data.email === '' && password === '') {
            toast.error("Preencha todos os campos para solicitar cadastro", {className:"error-toast"});
            setNameId('input-error');
            setEmailId('input-error');
            setPasswordId('input-error');

        } else if (data.name === '' && !(data.email === '') && !(password === '')) {
            toast.error("O nome é obrigatorio!", {className:"error-toast"});
            setNameId('input-error');
            setEmailId('');
            setPasswordId('');

        } else if (data.email === '' && !(data.name === '') && !(password === '')) {
            toast.error("O e-mail é obrigatorio!", {className:"error-toast"});
            setNameId('');
            setEmailId('input-error');
            setPasswordId('');

        } else if (password === '' && !(data.name === '') && !(data.email === '')) {
            toast.error("A senha é obrigatoria!", {className:"error-toast"});
            setNameId('');
            setEmailId('');
            setPasswordId('input-error');

        } else if (data.name === '' && data.email === '' && !(password === '')) {
            toast.error("Preencha nome e e-mail", {className:"error-toast"});
            setNameId('input-error');
            setEmailId('input-error');
            setPasswordId('');

        } else if (data.name === '' && password === '' && !(data.email === '')) {
            toast.error("Preencha nome e senha", {className:"error-toast"});
            setNameId('input-error');
            setEmailId('');
            setPasswordId('input-error');

        } else if (data.email === '' && password === '' && !(data.name === '')) {
            toast.error("Preencha e-mail e senha", {className:"error-toast"});
            setNameId('');
            setEmailId('input-error');
            setPasswordId('input-error');
        }
        else {

            data.password = password

            api.post("/auth/create", data).then(function (response) {

                setData(response.data)
                console.log(data)
                navigate('/')
                toast.success("Cadastro solicitado com sucesso", {className:"success-toast"});

            }).catch(function (error) {
                if (error.response.status === 409) {
                    toast.error("Já existe cadastro com esse e-mail", {className:"error-toast"});
                    setNameId('');
                    setEmailId('input-error');
                    setPasswordId('');

                } else if (error.response.status === 411) {
                    toast.error("A senha deve ter no mínimo 8 caracteres", {className:"error-toast"});
                    setNameId('');
                    setEmailId('');
                    setPasswordId('input-error');

                } else if (error.response.status === 422) {
                    toast.error("Preencha todos os campos para solicitar cadastro", {className:"error-toast"});

                } else {
                    toast.error("Ocorreu um erro de conexão ao serviço", {className:"error-toast"});
                    console.log(error);
                    console.log(data)
                }
            });
        }
    }

    const handleInputFocus = (field) => {

        setNameId('');
        setEmailId('');
        setPasswordId('');
    }

    useEffect(() => {

        if (password !==undefined) {

            if (password.length < 8) {
                setShowPasswordRequirements(true);
                setPasswordId('input-error');
                if (password === "") {
                    setShowPasswordRequirements(true);
                    setPasswordId('');
                }
            } else {
                setShowPasswordRequirements(false);
                setPasswordId('');
            }
        }

    }, [password])

    return (
        <div className="container">
            <div className="login-container">
                <div className="login-wrapper">

                    <img src={Logo} alt="Blizzard_Logo" title='Blizzard_Logo' />

                    <form onSubmit={handleSubmit}>

                        <div className='form-wrapper'>

                            <span className="form-title">Cadastro</span>
                            <span className="form-text">
                                Insira suas informações para criar a sua conta.
                            </span>

                            <label>Nome Completo</label>
                            <input
                                id={nameId}
                                type="text"
                                value={data.name}
                                name="name"
                                onChange={handleChange}
                                onFocus={handleInputFocus}
                            />


                            <label>E-mail</label>
                            <input
                                id={emailId}
                                type="email"
                                value={data.email}
                                name="email"
                                onChange={handleChange}
                                onFocus={handleInputFocus}
                            />

                            <label>Senha</label>
                            {/* <input
                                id={passwordId}
                                type="password"
                                value={data.password}
                                name="password"
                                onChange={handleChange}
                                onFocus={handleInputFocus}
                            /> */}

                            <PasswordInput
                                id={passwordId}
                                toggle={togglePassword}
                                setInput={setPassword}
                                maxLength={50}
                                isPassword={true}
                                setToggle={setTogglePassword}
                                value={password}
                                name="password"
                                onChange={(field) => {
                                    setPassword(field.target.value);
                                    handleChange()
                                }}
                                onFocus={handleInputFocus}
                            />

                            {showPasswordRequirements ?
                                <div className='password-requirement' id='password-signup'>
                                    <label>A senha deve conter no mínimo 8 caracteres.</label>
                                </div> : ''}

                        </div>

                        <button type="submit" id="signUp-button">Solicitar cadastro</button>

                        <div className="text-option">
                            <span>Já possui conta? <a href="" onClick={() => { navigate('/') }}>Entre aqui!</a></span>
                        </div>

                    </form>


                </div>
            </div>
        </div>

    )
}