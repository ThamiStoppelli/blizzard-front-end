import React, { useState, useContext, useEffect } from 'react';
import "./style.css"
import api, { listUsers } from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { AcceptUsers } from "../../components/AcceptUsers";

import negativeIcon from '../../assets/negative.png';
import positiveIcon from '../../assets/positive.png';
import userIcon from '../../assets/userIcon.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserRequests() {

  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const { user, token, config, userRequests, setUserRequests } = useContext(AuthContext);
  const [showAcceptUser, setAcceptUser] = useState(false);

  //criar função para obter dados dos cards
  //usar renderização condicional para gerar cada card de acordo com o tipo de alerta

  const handleModal = () => {
    if (modal == true) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  async function listRequests() {
    console.log(user.typeUser, token)
    localStorage.getItem("token", token);
    console.log("mostrando lista")

    await api.get(`/user/list?typeUser=3`, config).then(response => {

      setUserRequests(response.data);
      console.log(user)
      setLoading(false);

    }).catch(err => {
      if (err.response === undefined) {
        console.log("não há solicitações");

      } else {
        console.log(err.response);
      }
    })
  }

  function denyRequest(id, name) {

    api.delete(`/user/delUsersOnHold/${id}`)
    .then(()=>{
      api.get(`/user/list?typeUser=3`, config)
      .then((res)=>{
        setUserRequests(res.data)
        console.log(name)
        toast.success(`Usuário ${capitalizeFirstLetter(name)} negado`, {className:"success-toast"});

      }).catch((e) => {
        toast.error("Ocorreu um erro ao exibir a lista", {className:"error-toast"});
      })
    }).catch((e) => {
        toast.error("Não foi possível negar a solicitação", {className:"error-toast"});
    })    
  }

  useEffect(() => {
    listRequests();
    console.log(userRequests)
    // window.location.reload(true)
  }, [])

  const handleSetAcceptUser = (id) => {
    setAcceptUser(!showAcceptUser);
    setModal(false);
    localStorage.setItem("id", id)
  };

  function capitalizeFirstLetter(string) {

    const names = string.split(" ");
    for (let i = 0; i < names.length; i++) {
      names[i] = names[i][0].toUpperCase() + names[i].substr(1).toLowerCase();
    }
  
    return names.join(" ");
  }


  return (

    <>
      {userRequests.length > 0 ? 
     
        userRequests.map((user) => {
    
          return (
            <div key={user._id} className="request-card">
              <div className="request-text">
                <img src={userIcon} className="user-icon" />
                <div>
                  <h3 className="request-name">{capitalizeFirstLetter(user.name)}</h3>
                  <h3 className="request-email">{user.email}</h3>
                </div>
              </div>
              <div className='request-buttons'>
                <img onClick={() => {
                  denyRequest(user._id, user.name);
                }} src={negativeIcon} className="request-icon" />
    
                <img onClick={() => handleSetAcceptUser(user._id)} src={positiveIcon} className="request-icon" />
              </div>
            </div>
  
          )
        }) :  
        <div className="request-card" id="request-list-empty">
          <div className="request-text">
            <h3 className="request-name">Não há solicitações</h3>
          </div>
        </div>
      }

      {showAcceptUser && (
              <AcceptUsers
                onClick={handleSetAcceptUser}
                isOpen={showAcceptUser}
              />
            )}
    </>

  )
}

