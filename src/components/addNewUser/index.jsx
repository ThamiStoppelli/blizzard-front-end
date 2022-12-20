import { useState, useContext, useEffect } from "react";
import "./style.css";
import api from "../../services/api";
import { AuthContext } from '../../contexts/auth';
import Loading from '../../components/loading';

import closeIcon from '../../Assets/close.png';
import radioButton from '../../Assets/radio.png';
import radioButtonChecked from '../../Assets/radio-checked.png';
import rightArrowIcon from '../../Assets/right-arrow.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VisibilityPermissions } from "../visibilityPermissions";


export const AddNewUser = ({ onClick }) => {

  const [permissions, setPermissions] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [typeUser, setTypeUser] = useState();
  const [admId, setAdmId] = useState("");
  const [opId, setOpId] = useState("");
  const [radioButtonAdm, setRadioButtonAdm] = useState(radioButton);
  const [radioButtonOp, setRadioButtonOp] = useState(radioButton);
  const { config, user, users, setUsers, userRequests, setUserRequests, loading, setLoading, showModalVisibility, setShowModalVisibility, showOldModal, setShowOldModal, checkedLocations, setCheckedLocations, checkedSpaces, setCheckedSpaces } = useContext(AuthContext);
  const [showPermissionsModal, setShowPermissionsModal] = useState("");

  const handleShowPermissionsModal = () => {
    setShowPermissionsModal(!showPermissionsModal);
  };

  const handleId = (field) => {
    if (field == "adm") {
      setAdmId('role-id');
      setOpId('');
      setRadioButtonAdm(radioButtonChecked)
      setRadioButtonOp(radioButton)
      console.log("adm")
      setPermissions(false)
      setTypeUser(1);

    } else if (field == "op") {
      setAdmId('');
      setOpId('role-id');
      setRadioButtonAdm(radioButton)
      setRadioButtonOp(radioButtonChecked)
      console.log("op")
      setPermissions(true)
      setTypeUser(2);
    }
  }


  const createUser = async (field) => {

    field.preventDefault();

    const managerId = user._id

    const newUser = {
      name: name,
      email: email,
      typeUser: typeUser,
      blocks: checkedLocations,
      spaces: checkedSpaces,
    }

    console.log(managerId)
    setLoading(true);

    await api.post(`/user/create/${managerId}`, newUser, config).then(res => {

      setLoading(false);
      console.log(res.data)
      toast.success("Usuário cadastrado com sucesso", { className: "success-toast" })
      onClick();

      api.get(`/user/list?typeUser=-1`, config).then(response => {

        setUsers(response.data);

      }).catch(err => {
        console.log(err)
      })

    }).catch((err) => {
      console.log(err)
      setLoading(false);
      toast.error(`${err.response.data.err}`, { className: "error-toast" })
    })

  };

  return (

    <div className="background">
      {showModalVisibility && !showOldModal &&
        <VisibilityPermissions
          title={'Cadastro de usuários'}
          buttonText={'Atribuir ao usuário'}
          buttonPosition={"buttons-permissions-right"}
          //onClick={() => handleShowPermissionsModal}
          setShowGoBackButton={true}
          showGoBackButton={true}
          close={onClick}
        />}

      {!showModalVisibility && showOldModal && (

        <div className="add-user">
          <div className="header-wrapper-accept">
            <div>
              <span>Cadastro de usuário</span>
              <img src={closeIcon} onClick={onClick}></img>
            </div>
            <a>Informações do usuário</a>
          </div>

          <form onSubmit={createUser}>
            <div className="form-wrapper">
              <label>Nome de identificação do usuário</label>
              <input
                type="name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
              <label>E-mail</label>
              <input
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />

              <label>Tipo de usuário</label>
              <div className="item-select">
                <div className="item" onClick={() => { handleId("adm") }} id={admId}>
                  <img src={radioButtonAdm} />
                  <label id="radio-item">Administrador</label>
                </div>

                <div className="item" onClick={() => { handleId("op") }} id={opId}>
                  <img src={radioButtonOp} />
                  <label id="radio-item">Operador</label>
                </div>
              </div>

              {permissions ?
                <a onClick={() => {
                  setShowModalVisibility(true)
                  setShowOldModal(false)
                }}>
                  <div className="permissions-button" id="permission-add-user">
                    <p>Permissão de visualização</p>
                    <img src={rightArrowIcon}></img>
                  </div>
                </a>
                : null
              }

              <label>Senha</label>
              <p className="password-message">Senha será gerada automaticamente pelo sistema e enviada para o e-mail cadastrado.</p>

              <div className="buttonsDivModal">
                <button className="addButton" type="submit">
                  {loading ? <Loading /> : 'Cadastrar usuário'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};