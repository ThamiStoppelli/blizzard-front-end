import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';

import userIcon from '../../assets/userIcon.svg';
import DotsIcon from '../../assets/vertical-dots.svg';
import deleteIcon from '../../assets/trash.svg';
import roleIcon from '../../assets/position.svg';
import visibilityPermisisonsIcon from '../../assets/visibility-permissions-op.svg'
import { AuthContext } from '../../contexts/auth';
import api from "../../services/api";

import "./style.css";

function UserCard({
  key, name, email, role, id,
  setTableUserId, setDeletedUserName, setTableUserRole, 
  setConfirmDeletePopUp, confirmDeletePopUp,
  //setShowPermissionsModal, showPermissionsModal, 
  //setShowMakeOpModal, showMakeOpModal

}) {

  const [showModal, setShowModal] = useState(false);
  const { config, user, setUsers, setLoading,checkedLocations, checkedSpaces, showMakeOpModal, setShowMakeOpModal, showPermissionsModal, setShowPermissionsModal } = useContext(AuthContext);


  function convertType(type) {
    switch (type) {
      case 0:
        return "Gestor"
      case 1:
        return "Administrador"
      case 2:
        return "Operador"
    }
  }
  function handleDelete(){
    setShowModal(false)
    console.log(confirmDeletePopUp)
    setConfirmDeletePopUp(true)
  }

  function handleVisibilityPermissions(){
    setShowModal(false)
    console.log(showPermissionsModal)
    setShowPermissionsModal(true)
  }

  function handleMakeOpModal(){
    setShowModal(false)
    console.log(showMakeOpModal)
    setShowMakeOpModal(true)
  }

  const handleChangeRole = async (field) => {
    field.preventDefault();
    setShowModal(false)

    const managerId = user._id

    if(role === 2) {

      const updateTypeUser = {
        updateUserId: id,
        typeUser: 1,
        blocks: checkedLocations,
        spaces: checkedSpaces,
      } 
  
      console.log(managerId)
      setLoading(true);
  
      await api.put(`/user/update/typeUser/${managerId}`, updateTypeUser, config).then(res => {
  
        setLoading(false);
        console.log(res.data)
        toast.success(`Novo cargo de administrador atribuído com sucesso`, { className: "success-toast" })
  
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
    } else if (role === 1) {
      
      const updateTypeUser = {
        updateUserId: id,
        typeUser: 2,
        blocks: checkedLocations,
        spaces: checkedSpaces,
      } 
  
      console.log(managerId)
      setLoading(true);
  
      await api.put(`/user/update/typeUser/${managerId}`, updateTypeUser, config).then(res => {
  
        setLoading(false);
        console.log(res.data)
        toast.success(`Novo cargo de operador atribuído com sucesso`, { className: "success-toast" })
  
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
    }
  }

  function capitalizeFirstLetter(string) {
    const names = string.split(" ");
    for (let i = 0; i < names.length; i++) {
      if (names[i] === "de" || names[i] === "De" || names[i] === "do" || names[i] === "dos" || names[i] === "Do" || names[i] === "Dos" || names[i] === "da" || names[i] === "das" || names[i] === "Da" || names[i] === "Das" || names[i] === "e" || names[i] === "E") {
        //console.log(names[i])
        names[i] = names[i][0].toLowerCase() + names[i].substr(1);
      } else {
        names[i] = names[i][0].toUpperCase() + names[i].substr(1);
      }
      //ver includes
    }

    return names.join(" ");
  }
  //tratar erros: erro de conexao e usuario sem permissao (tem outro?)

  return (

    <div key={key} className="users-card">
      <div id='user-name'>
        <img src={userIcon} className="user-icon" />
        <p>{capitalizeFirstLetter(name)}</p>
      </div>
      <p id='user-email'>{email}</p>
      <div className='user-role'>
        <p id='user-role'> {convertType(role)} </p>
      </div>

      {role !==0 ?
        <Popup
          trigger={<div className='info-dots'><img src={DotsIcon} onClick={() => {
            setTableUserId(id);
            setDeletedUserName(name);
            setTableUserRole(role);
            setShowModal(true);
          }} /></div>}
          position="left bottom"
          on="click"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: '0px', border: 'none' }}
          arrow={false}
        >

          {showModal && (role === 1) ?
            (
              <div className="container-modal">
                <div className="modal-adm">
                  <div className="modal-button" onClick={handleMakeOpModal}>
                    <img src={roleIcon}></img>
                    <h3 className="text-modal">
                      Tornar Operador
                    </h3>
                  </div>
                  <p>
                    O operador poderá acompanhar, operar e coletar dados dos aparelhos.
                  </p>
                  <div className="modal-button" onClick={handleDelete}>
                    <img src={deleteIcon}></img>
                    <h3 className="text-modal" id="delete-user">
                      Excluir usuário
                    </h3>
                  </div>
                </div>
              </div>
            )
            : null
          }

          {showModal && (role === 2) ?
            (
              <div className="container-modal">
                <div className="modal-op">
                  <div className="modal-button" onClick={handleChangeRole}>
                    <img src={roleIcon}></img>
                    <h3 className="text-modal">
                      Tornar Administrador
                    </h3>
                  </div>
                  <p>
                    O Administrador poderá gerenciar operadores e aparelhos, podendo monitorar os dados coletados do sistema.
                  </p>
                  <div className="modal-button" onClick={handleVisibilityPermissions}>
                    <img src={visibilityPermisisonsIcon}></img>
                    <h3 className="text-modal">
                      Permissões de visualização
                    </h3>
                  </div>
                  <div className="modal-button" onClick={handleDelete}>
                    <img src={deleteIcon}></img>
                    <h3 className="text-modal" id="delete-user">
                      Excluir usuário
                    </h3>
                  </div>
                </div>
              </div>
            ) : null
          }

        </Popup>
        : <div className='blank-div' />
      }
    </div>
  )
}

export default UserCard;