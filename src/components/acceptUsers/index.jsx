import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "./style.css";
import api from "../../services/api";
import { AuthContext } from '../../contexts/auth';
import { VisibilityPermissions } from '../../components/VisibilityPermissions';
import Loading from '../../components/Loading';

import closeIcon from '../../assets/close.png'
import radioButton from '../../assets/radio.png';
import radioButtonChecked from '../../assets/radio-checked.png';
import rightArrowIcon from '../../assets/right-arrow.svg';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AcceptUsers = ({ isOpen, onClick }) => {

  const [permissions, setPermissions] = useState(false);
  const [admId, setAdmId] = useState("");
  const [opId, setOpId] = useState("");
  const [radioButtonAdm, setRadioButtonAdm] = useState(radioButton);
  const [radioButtonOp, setRadioButtonOp] = useState(radioButton);
  const { config, user, users, setUsers, userRequests, setUserRequests, permissionsModal, setPermissionsModal, loading, setLoading, showModalVisibility, setShowModalVisibility, showOldModal, setShowOldModal, checkedLocations, setCheckedLocations, checkedSpaces, setCheckedSpaces } = useContext(AuthContext);
  const [typeUser, setTypeUser] = useState();


  let navigate = useNavigate();

  const handleAcceptUsers = async () => {
    const userId = localStorage.getItem("id");
    const managerId = user._id

    const updatedUser = {
      updateUserId: userId,
      typeUser: typeUser,
      blocks: checkedLocations,
      spaces: checkedSpaces,
    }

    console.log(managerId)
    console.log(typeUser)
    console.log(userId)
    setLoading(true);

    await api.put(`/user/update/typeUser/${managerId}`, updatedUser, config).then(res => {
      setLoading(false);
      console.log(res.data)
      toast.success("Usuário confirmado com sucesso", {className:"success-toast"})
      onClick();

      api.get(`/user/list?typeUser=-1`, config).then(response => {
        setUsers(response.data);
      }).catch(err => {
        console.log(err)
      })

      api.get(`/user/list?typeUser=3`, config).then(response => {
        setUserRequests(response.data);
      }).catch(err => {
        console.log(err)
      })

    }).catch((err) => {
      if(user.typeUser != 0) {
        console.log(err)
        setLoading(false);
        toast.error("Você não possui autorização para confirmar solicitação de cadastro", {className:"error-toast"}) 
        //validar texto com design ("Apenas usuario gestor pode confirmar solicitacao de cadastro") 
        //validar se somente gestor pode aceitar/negar (REQUISITO)  
      } else {
        console.log(err)
        setLoading(false);
        toast.error(err.response.data.err, {className:"error-toast"})
        //validar texto
      }
      //tratar erros: erro de conexao e usuario sem permissao (tem outro?)
    })
  }


  const handleId = (field) => {
    if (field == "adm") {
      setAdmId('role-id');
      setOpId('');
      setRadioButtonAdm(radioButtonChecked)
      setRadioButtonOp(radioButton)
      setTypeUser(1);
      console.log("adm")
      setPermissions(false)

    } else if (field == "op") {
      setAdmId('');
      setOpId('role-id');
      setRadioButtonAdm(radioButton)
      setRadioButtonOp(radioButtonChecked)
      setTypeUser(2);
      console.log("op")
      setPermissions(true)
    }
  }

  return (
    <div className="background">

      {showModalVisibility && !showOldModal && 
      <VisibilityPermissions 
        title={'Autenticação de usuários'}
        buttonText={'Atribuir ao usuário'}
        setShowGoBackButton={true}
        showGoBackButton={true}
        close={onClick}
        buttonPosition={"buttons-permissions-right"}
      />}

      {!showModalVisibility && showOldModal && (

      <div className="accept-user">
        <div className="header-wrapper-accept">
          <div>
            <span>Autenticação de usuários</span>
            <img src={closeIcon} onClick={onClick}></img>
          </div>
          <a>Tipos de cargos</a>
        </div>

        <a>Tipo de usuário</a>
        <div className="item-select">
          <div className="item" onClick={() => { handleId("adm") }} id={admId}>
            {/* <input type="radio" name="position" value="adm" />  
            <label for="adm">Administrador</label> */}
            <img src={radioButtonAdm} />
            <label>Administrador</label>
          </div>

          <div className="item" onClick={() => { handleId("op") }} id={opId}>
            {/* <input type="radio" name="position" value="op" />
            <label for="op">Operador</label> */}
            <img src={radioButtonOp} />
            <label>Operador</label>
          </div>
        </div>

        {permissions ?
        <a onClick={() => {
          setShowModalVisibility(true)
          setShowOldModal(false)
          }}>
          <div className="permissions-button">
            <label>Permissão de visualização</label>
            <img src={rightArrowIcon}></img>
          </div>
        </a>
          : null
        }

        {/* {permissionsModal &&
          <VisibilityPermissions
            open={permissionsModal}
            onClose={() => setPermissionsModal(false)}
          />
        } */}

        <div className="buttons-modal">
          <button className="addButton" onClick={handleAcceptUsers} disabled={false}>
            Autenticar usuário
          </button>
        </div>
      </div>
      )}
    </div>
  );
};
