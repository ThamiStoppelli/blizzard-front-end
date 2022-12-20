import "./style.css";
import { useState, useContext } from "react";
import userIcon from "../../Assets/userIcon.svg";
import arrowDown from "../../Assets/arrowDown.png";
import { useNavigate } from 'react-router-dom';
import aboutSystem from "../../Assets/aboutSystem.png";
import changePassword from "../../Assets/changePassword.png";
import exit from "../../Assets/exit.png";
import { ChangePassword } from "../../components/changePassword";
import { AuthContext } from "../../contexts/auth";


export default function Header({ title }) {

  const [modal, setModal] = useState(false);
  const [showChangePassword, setChangePassword] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleModal = () => {
    if (modal == true) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  const handleSetChangePassword = () => {
    setChangePassword(!showChangePassword);
    setModal(false);
  };

  const handleLogout = () => {

    logout();
  }

  let navigate = useNavigate()

  return (
    <div className="header">
      <h3 className="headerTitle">{title}</h3>

      <div>
      <button className="userInfo" onClick={handleModal}>
        <img src={userIcon} className="iconUserInfo" />
        <img src={arrowDown} className="arrowUserInfo" />
      </button>
      {modal ? (
        <div className="containerModal">
          <div className="modal">
            <div className="modalButton" onClick={handleSetChangePassword}>
              <img src={changePassword}></img>
              <h3 className="textModal">
                Alterar senha
              </h3>
            </div>
            <div className="modalButton" onClick={() => { navigate('/sobre/autenticado') }}>
              <img src={aboutSystem}></img>
              <h3 className="textModal">
                Sobre o sistema
              </h3>
            </div>
            <div className="modalButton" onClick={() => setConfirmPopUp(true)}>
              <img src={exit}></img>
              <h3 className="textModal">
                Sair
              </h3>
            </div>
          </div>
        </div>
      ) : null}

      {showChangePassword && 
        <ChangePassword
          onClick={handleSetChangePassword} 
          isOpen={showChangePassword}
        />
      }

      {confirmPopUp ? 
          <div className="container-confirm-popup"> 
            <div className="confirm-popup">
              <div className="textarea-popup">
              <p>Sair do sistema</p>
              <span className='label' id="text-popup">Deseja realmente sair do Blizzard?</span>
              </div>
              <div className="buttons-popup">
                  <button className="cancel-button" onClick={() => setConfirmPopUp(false)}>
                  Cancelar
                  </button>
                  <button className="exit-button" onClick={handleLogout}>
                  Sair
                  </button>
              </div>  
            </div>     
          </div> 
      : null}

      </div>
    </div>

  );
}
