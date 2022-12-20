import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordInput from '../../components/PasswordInput';

import "./style.css"
import Logo from "../../assets/Logo.png"


export default function PasswordReset() {

    let navigate = useNavigate()

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = window.location.search.split("=")[1].split("&")[0];
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
    const [passwordId, setPasswordId] = useState('');
    const [confirmPasswordId, setConfirmPasswordId] = useState("");
    const [isConfirmPasswordDifferent, setIsConfirmPasswordDifferent] = useState(false);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

    const handleRedefinedPassword = async (field) => {
        field.preventDefault();

        if (password === '' && confirmPassword === '') {
            toast.error("Insira a nova senha e confirme", { className: "error-toast" });
            setPasswordId('input-error');
            setConfirmPasswordId('input-error');

        } else if (password === '' && !(confirmPassword === '')) {
            toast.error("Insira a nova senha", { className: "error-toast" });
            setPasswordId('input-error');
            setConfirmPasswordId('');

        } else if (confirmPassword === '' && !(password === '')) {
            toast.error("Insira a confirmação da nova senha", { className: "error-toast" });
            setPasswordId('');
            setConfirmPasswordId('input-error');

        } else {
            try {
                const response = await api.put("/auth/resetPassword", {
                    password,
                    confirmPassword,
                    token,
                });
                if (response.status === 200) {
                    toast.success("Senha alterada com sucesso", { className: "success-toast" });
                    navigate("/", { replace: true });
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 404 || !error.response.status) {
                    console.log(error)
                    toast.error("Ocorreu um erro de conexão ao serviço", { className: "error-toast" });

                } else if (password !==confirmPassword) {
                    toast.error("As senhas não são iguais", { className: "error-toast" })
                    console.log(error)

                } else if (error.response.status === 422) {
                    toast.error("Link expirado. Solicite envio da recuperação de senha novamente", { className: "error-toast" })
                    console.log(error)

                } else if (error.response.status === 411) {
                    toast.error("A senha deve ter no mínimo 8 caracteres", { className: "error-toast" })
                    console.log(error)
                    setPasswordId('different');
                    setConfirmPasswordId('different');

                } else {
                    toast.error("A senha precisa ser diferente da senha atual", { className: "error-toast" })
                    console.log(error)
                }
            }
        }
    };

    const handleConfirmPassword = (field) => {
        setConfirmPassword(field.target.value);
        setIsConfirmPasswordDifferent(true);
    }

    useEffect(() => {

        if (password !==undefined || confirmPassword !==undefined) {

            setShowPasswordRequirements(true);

            if (password !=="" || confirmPassword !=="") {
    
                if (password.length >= 8 && confirmPassword.length >= 8) {
                    setShowPasswordRequirements(false);
    
                    if (password === confirmPassword) {
                        setIsConfirmPasswordDifferent(false);
                        setPasswordId('');
                        setConfirmPasswordId('');
    
                    } else {
                        setIsConfirmPasswordDifferent(true);
                        setPasswordId('');
                        setConfirmPasswordId('input-error');
    
                    } 
                } else {
                    setShowPasswordRequirements(true);
                    setIsConfirmPasswordDifferent(false);

                    if (password.length < 8) {
                        setPasswordId('input-error');
                    }
                    if (confirmPassword.length < 8) {
                        setConfirmPasswordId('input-error');
                    }

                    if (password.length < 8) {
                        setPasswordId('input-error');
                        if (password === "") {
                          setPasswordId('');
                        }
                      } else {
                        setPasswordId('');
                      }
                      if (confirmPassword.length < 8) {
                        setConfirmPasswordId('input-error');
                        if (confirmPassword === "") {
                          setConfirmPasswordId('');
                        }
                      } else {
                        setConfirmPasswordId('');
                      }
                }
            } else {
                setPasswordId('');
                setConfirmPasswordId('');

                if (password === '') {
                    setPasswordId('');
        
                } else if (confirmPassword === '') {
                    setConfirmPasswordId('');
                }
            } 
        }

    }, [confirmPassword, password])


const handleInputFocus = () => {

    if (isConfirmPasswordDifferent) {
        setPasswordId('');
        setConfirmPasswordId('different');

    } else {
        setPasswordId('');
        setConfirmPasswordId('different');
    }
}

return (
    <div className="container">
        <div className="login-container">
            <div className="login-wrapper">

                <img src={Logo} alt="Blizzard_Logo" title='Blizzard_Logo' />

                <form>

                    <div className="form-wrapper" id="recovery">

                        <span className="form-title">Alteração de senha</span>
                        <p className="form-text">
                            Insira sua nova senha nos campos abaixo. Atenção, a senha deve conter no mínimo 8 caracteres.
                        </p>

                        <label>Nova senha</label>
                        <PasswordInput
                            id={passwordId}
                            toggle={togglePassword}
                            setInput={setPassword}
                            maxLength={50}
                            isPassword={true}
                            name="password"
                            setToggle={setTogglePassword}
                            value={password}
                            onChange={(field) => setPassword(field.target.value)}
                            onBlur={handleInputFocus}
                        />

                        <label>Confirme sua nova senha</label>
                        {/* <input
                                id={confirmPasswordId}
                                type={togglePassword ? "text" : "password"}
                                name="password"
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
                                onBlur={handleInputFocus}
                            /> */}

                        <PasswordInput
                            id={confirmPasswordId}
                            toggle={toggleConfirmPassword}
                            setInput={setConfirmPassword}
                            maxLength={50}
                            isPassword={true}
                            name="password"
                            setToggle={setToggleConfirmPassword}
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            onBlur={handleInputFocus}
                        />
                        <div>

                            {/* showErrorMessage &&  */}
                            {isConfirmPasswordDifferent ?
                                <div className='password-requirement'>
                                    <label>As senhas não são iguais </label>
                                </div> : ''}

                            {showPasswordRequirements ?
                                <div
                                    className='password-requirement'>
                                    <label>A senha deve conter no mínimo 8 caracteres.</label>
                                </div> : ''}
                        </div>


                    </div>

                    <button id="recovery-button" onClick={handleRedefinedPassword}>Alterar senha</button>

                    <div className="text-option">
                        <span>Lembrou da sua senha? <a href="" onClick={() => { navigate('/') }}>Entre aqui!</a></span>
                    </div>

                </form>
            </div>
        </div>
    </div>

)
}