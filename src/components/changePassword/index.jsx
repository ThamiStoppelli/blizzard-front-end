import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import closeIcon from '../../Assets/close.png'
import api from "../../services/api";
import PasswordInput from "../passwordInput";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChangePassword = ({ isOpen, onClick }) => {

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [passwordId, setPasswordId] = useState('password-input');
  const [newPasswordId, setNewPasswordId] = useState('password-input');
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const [togglePassword, setTogglePassword] = useState(false)
  const [toggleNewPassword, setToggleNewPassword] = useState(false)

  let navigate = useNavigate()

  const HandleChangePassword = async (field) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    console.log(id)

    field.preventDefault();

    try {
      const response = await api.put("/user/changePassword/", {
        id,
        password,
        newPassword,
      },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Senha alterada com sucesso", {className:"success-toast"});
        setConfirmPopUp(false);

      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 422) {
        toast.error("A senha atual está incorreta", {className:"error-toast"});
        setConfirmPopUp(false);
        setPasswordId('password-input-error');
        setModalIsOpen(isOpen);

      } else if (password == newPassword) {
        toast.error("A nova senha deve ser diferente da senha atual", {className:"error-toast"});
        setConfirmPopUp(false);
        setNewPasswordId('password-input-error');
        setModalIsOpen(isOpen);

      } else if (error.response.status == 411) {
        toast.error("A senha deve ter no mínimo 8 caracteres", {className:"error-toast"});
        setConfirmPopUp(false);
        setNewPasswordId('password-input-error');
        setModalIsOpen(isOpen);

      } else {
        toast.error("Erro de conexão ao servidor", {className:"error-toast"});
        setConfirmPopUp(false);
      }
    }

  };

  const handleInput = (field) => {

    field.preventDefault();
    setShowPasswordRequirements(true);

    if (password === '' && newPassword === '') {
      toast.error("Preencha os campos para alterar a senha", {className:"error-toast"});
      setPasswordId('password-input-error');
      setNewPasswordId('password-input-error');

    } else if (password === '' && !(newPassword === '')) {
      toast.error("Informe a senha atual", {className:"error-toast"});
      setPasswordId('password-input-error');
      setNewPasswordId('password-input');

    } else if (newPassword === '' && !(password === '')) {
      toast.error("Informe a nova senha", {className:"error-toast"});
      setPasswordId('password-input');
      setNewPasswordId('password-input-error');

    } else {

      setConfirmPopUp(true);
      setModalIsOpen(!modalIsOpen);
    }
  }

  async function HandleSubmit(field) {
    field.preventDefault()
  }

  const handleInputFocus = () => {
    setPasswordId('password-input');
    setNewPasswordId('password-input');
  }

  useEffect(() => {
    if (password != undefined) {

      if (password.length < 8) {
        setShowPasswordRequirements(true);
        setPasswordId('input-error');
        if (password == "") {
          setShowPasswordRequirements(true);
          setPasswordId('');
        }
      } else {
        setShowPasswordRequirements(false);
        setPasswordId('');
      }
      if (newPassword.length < 8) {
        setShowPasswordRequirements(true);
        setNewPasswordId('input-error');
        if (newPassword == "") {
          setShowPasswordRequirements(true);
          setNewPasswordId('');
        }
      } else {
        setShowPasswordRequirements(false);
        setNewPasswordId('');
      }
    }
  }, [password, newPassword])


  return (
    <div>
      {
        modalIsOpen ?
          <div className="background">
            <form className="change-password" onSubmit={(field) => HandleSubmit(field)}>
              <div className="header-wrapper">
                <p>Alteração de senha</p>
                <img src={closeIcon} onClick={onClick}></img>
              </div>
              <div className="form-wrapper" id="password-wrapper">
                <label>Senha atual</label>
                {/* <input
            id={passwordId}
            type="password"
            onChange={(field) => {setPassword(field.target.value)}}
            onFocus={handleInputFocus}
          /> */}

                <PasswordInput
                  id={passwordId}
                  toggle={togglePassword}
                  setInput={setPassword}
                  maxLength={50}
                  isPassword={true}
                  setToggle={setTogglePassword}
                  onChange={(field) => setPassword(field.target.value)}
                  onFocus={handleInputFocus}
                />


                <label>Senha nova</label>
                {/* <input
            id={newPasswordId}
            type="password"
            onChange={(field) => {setNewPassword(field.target.value)}}
            onFocus={handleInputFocus}
          /> */}

                <PasswordInput
                  id={newPasswordId}
                  toggle={toggleNewPassword}
                  setInput={setNewPassword}
                  maxLength={50}
                  isPassword={true}
                  setToggle={setToggleNewPassword}
                  onChange={(field) => setNewPassword(field.target.value)}
                  onFocus={handleInputFocus}
                />

                {showPasswordRequirements ?
                  <div className='password-requirement'>
                    <label>A senha deve conter no mínimo 8 caracteres.</label>
                  </div> : ''}

              </div>

              <button type="submit" className="password-button" onClick={handleInput}>Alterar senha
              </button>
            </form>
          </div>
          : null
      }

      {confirmPopUp ?
        <div className="container-confirm-popup">
          <div className="confirm-popup">
            <div className="textarea-popup">
              <p>Alterar senha</p>
              <span className='label' id="text-popup">Deseja realmente alterar a sua senha?</span>
            </div>
            <div className="buttons-popup">
              <button className="cancel-button" onClick={() => {
                setConfirmPopUp(false)
              }
              }>
                Cancelar
              </button>
              <button className="addButton" id="change" onClick={HandleChangePassword}>
                Alterar
              </button>
            </div>
          </div>
        </div>
        : null}

    </div>
  );
};