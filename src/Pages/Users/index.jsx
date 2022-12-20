import React, { useContext, useEffect, useState } from 'react';
import "./style.css"
import { AddNewUser } from '../../components/AddNewUser';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

import 'react-toastify/dist/ReactToastify.minimal.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import addIcon from '../../assets/addIcon.png';
import NavBar from "../../components/Navbar";
import Header from '../../components/Header';
import UserRequests from '../../components/UserRequests';
import downArrowIcon from '../../assets/down-arrow.svg';
import upArrowIcon from '../../assets/up-arrow.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VisibilityPermissions } from '../../components/VisibilityPermissions';
import UserCard from '../../components/UserCard';

export default function Users() {

  const [confirmDenyPopUp, setConfirmDenyPopUp] = useState(false);
  const [confirmDeletePopUp, setConfirmDeletePopUp] = useState(false);
  const [makeOpPopUp, setMakeOpPopUp] = useState(false);
  const [changePermissionsPopUp, setChangePermissionsPopUp] = useState(false);
  const [showAddUser, setAddUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout, token, config, setUserRequests, users, setUsers, showMakeOpModal, setShowMakeOpModal, showPermissionsModal, setShowPermissionsModal, checkedLocations, checkedSpaces } = useContext(AuthContext);
  const [role, setRole] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const renderData = users.filter((item) => teste(item, role));
  const [listOrder, setListOrder] = useState('name');
  const [arrowIcon, setArrowIcon] = useState(downArrowIcon);
  const [tableUserRole, setTableUserRole] = useState();
  const [tableUserId, setTableUserId] = useState();
  const [deletedUserName, setDeletedUserName] = useState();


  function teste(item, role) {
    if (item.typeUser == role) {
      return true
    }
    return false
  }

  //.replace(/(^\w{1})|(\s+\w{1})/g, text);

  useEffect(() => {
    // console.log(renderData) 
  }, [renderData])

  useEffect(() => {
    api.get(`/user/list?typeUser=-1`, config).then(response => {

      setUsers(response.data);

    }).catch(err => {
      console.log(token)
      console.log(role)

      if (err.response === undefined) {
        console.log("não existem usuários");

      } else {
        console.log(err.response);
        logout();
      }
    })

  }, [role])

  function handleDenyAll() {

    setConfirmDenyPopUp(false)

    //colocar verificação de se existe solicitação. se sim, faz request de denyAll, se nao, toast("Não há solicitações") -> precisa? ver tipo do toast (success, error)

    api.delete(`/user/denyAll`).then(() => {

      api.get(`/user/list?typeUser=3`, config)
        .then((res) => {
          setUserRequests(res.data)
          toast.success("Todas as solicitações foram negadas", { className: "success-toast" });

        }).catch((e) => {
          toast.error("Ocorreu um erro ao exibir a lista", { className: "error-toast" });
        })
    }).catch((e) => {
      toast.error("Não foi possível negar as solicitações", { className: "error-toast" });
    })
  }

  //listUsers é assíncrono entao precisa fazer await, mas não dá pra colocar async no useEffect -> para contornar isso criamos uma função anônima dentro do js

  const handleSetAddUser = () => {
    setAddUser(!showAddUser);
  };

  const handleShowPermissionsModal = () => {
    setShowPermissionsModal(!showPermissionsModal);
  };

  const handleChangePermissionsPopUp = () => {
    setShowPermissionsModal(false)
    setChangePermissionsPopUp(true)
    console.log(checkedLocations, checkedSpaces)
  }

  const handleChangePermissions = async (field) => {
    field.preventDefault();
    setChangePermissionsPopUp(false)

    const updatePermissions = {
      blocks: checkedLocations,
      spaces: checkedSpaces,
    }
    setLoading(true);

    await api.put(`/user/update/viewPermissions/${tableUserId}`, updatePermissions, config).then(res => {

      setLoading(false);
      console.log(res.data)
      toast.success(`Operador editado com sucesso!`, { className: "success-toast" })

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


  const handleShowMakeOpModal = () => {
    setShowMakeOpModal(!showMakeOpModal);
  }

  const handleMakeOpPopUp = () => {
    setShowMakeOpModal(false)
    setMakeOpPopUp(true)
    console.log(checkedLocations, checkedSpaces)
  }

  const handleChangeRole = async (field) => {
    field.preventDefault();
    setMakeOpPopUp(false)

    const managerId = user._id

    if (tableUserRole == 2) {

      const updateTypeUser = {
        updateUserId: tableUserId,
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
    } else if (tableUserRole == 1) {

      const updateTypeUser = {
        updateUserId: tableUserId,
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

  const handleDeleteUser = async (id) => {

    const managerId = user._id

    const tableUser = {
      id: id,
    }

    console.log(managerId)
    console.log(tableUser)
    console.log(`/user/delete/${managerId}`)
    console.log(deletedUserName)

    await api.delete(`/user/delete/${managerId}`, { data: tableUser }, config).then(res => {

      console.log(res.data)
      toast.success(`Usuário ${capitalizeFirstLetter(deletedUserName)} excluído`, { className: "success-toast" })
      setConfirmDeletePopUp(false)

      api.get(`/user/list?typeUser=-1`, config).then(response => {

        setUsers(response.data);

      }).catch(err => {
        console.log(err)
      })
    }).catch((err) => {
      toast.error("Não foi possível excluir o usuário", { className: "error-toast" });
      console.log(err)
    })
  }

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

  function dynamicSort(event) {
    var sortOrder = 1;

    if (event[0] === "-") {
      sortOrder = -1;
      event = event.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[event].localeCompare(a[event]);
      } else {
        return a[event].localeCompare(b[event]);
      }
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
    }

    return names.join(" ");
  }

  function handleListOrder() {
    if (listOrder == 'name') {
      setListOrder('-name');
      setArrowIcon(upArrowIcon);
    } else if (listOrder == '-name') {
      setListOrder('name')
      setArrowIcon(downArrowIcon);
    }
  }

  function replaceSpecialChars(string) {
    string = string.replace(/[àáâãä]/, "a");
    string = string.replace(/[èéêë]/, "e");
    string = string.replace(/[ìíî]/, "i");
    string = string.replace(/[òóôõö]/, "o");
    string = string.replace(/[ç]/, "c");

    return string.replace(/[^a-z0-9]/gi, '');
  }

  return (
    <div className="home">

      <NavBar />

      <div className="List">

        <Header title="Usuários" />

        <div className="elements-content">
          <div className="content">
            <div className="search-area" >
              <input className="search" type="text" placeholder="Pesquise por nome ou e-mail" onChange={(event) => {
                setSearchTerm(event.target.value);
              }} />
              {/* transformar em componente */}

              <Select
                className='select-role'
                id="select-role"
                value={role}
                sx={{
                  boxShadow: 'none',
                  borderRadius: '6px',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 }
                }}
                defaultValue="-1"
                onChange={(event) => {
                  setRole(parseInt(event.target.value));
                }}              >
                <MenuItem className="select-menu" value="-1">Todos</MenuItem>
                <MenuItem value="0">Gestores</MenuItem>
                <MenuItem value="1">Administradores</MenuItem>
                <MenuItem value="2">Operadores</MenuItem>
              </Select>
            </div>

            <button onClick={handleSetAddUser} className="addButton">
              <img src={addIcon} className="addIcon" />
              Cadastrar usuário
            </button>

            {showAddUser && (
              <AddNewUser
                onClick={handleSetAddUser}
              //isOpen={showAddUser}
              />
            )}

            {renderData.length === 0 && role != -1 ?

              <p className='no-users'>Não existem {convertType(role).toLowerCase()}es.</p> :
              <div>
                <div className="users-header">
                  <div id="header-name" onClick={() => handleListOrder()}>
                    Usuários
                    <img src={arrowIcon} />
                  </div>
                  <p id="header-email">E-mail</p>
                  <p>Cargo</p>
                  <div className='blank-div' />
                </div>

                {role != -1 ?
                  renderData.sort(dynamicSort(listOrder)).filter((event) => {
                    if (searchTerm == "") {
                      return event
                    } else if (replaceSpecialChars(event.name.toLowerCase()).includes(replaceSpecialChars(searchTerm.toLowerCase()))) {
                      return event
                    } else if (replaceSpecialChars(event.email.toLowerCase()).includes(replaceSpecialChars(searchTerm.toLowerCase()))) {
                      return event
                    }
                  }).map((user) => (
                    <UserCard
                      key={user._id}
                      name={user.name}
                      email={user.email}
                      role={user.typeUser}
                      id={user._id}
                      setTableUserId={setTableUserId}
                      setDeletedUserName={setDeletedUserName}
                      setTableUserRole={setTableUserRole}
                      setConfirmDeletePopUp={setConfirmDeletePopUp}
                      confirmDeletePopUp={confirmDeletePopUp}
                    />
                  )) :
                  users.sort(dynamicSort(listOrder)).filter((event) => {
                    if (searchTerm == "") {
                      return event
                    } else if (replaceSpecialChars(event.name.toLowerCase()).includes(replaceSpecialChars(searchTerm.toLowerCase()))) {
                      return event
                    } else if (replaceSpecialChars(event.email.toLowerCase()).includes(replaceSpecialChars(searchTerm.toLowerCase()))) {
                      return event
                    }
                  }).map((user) => (
                    <UserCard
                      key={user._id}
                      name={user.name}
                      email={user.email}
                      role={user.typeUser}
                      id={user._id}
                      setTableUserId={setTableUserId}
                      setDeletedUserName={setDeletedUserName}
                      setTableUserRole={setTableUserRole}
                      setConfirmDeletePopUp={setConfirmDeletePopUp}
                      confirmDeletePopUp={confirmDeletePopUp}
                    />
                  ))}

              </div>
            }
          </div>

          {showPermissionsModal && (
            <VisibilityPermissions
              title={`Operador: ${capitalizeFirstLetter(deletedUserName)}`}
              close={handleShowPermissionsModal}
              buttonText={'Atualizar permissões'}
              buttonPosition={"buttons-permissions-center"}
              onClickModal={handleChangePermissionsPopUp}
            />
          )}

          {showMakeOpModal && (
            <VisibilityPermissions
              title={`Operador: ${capitalizeFirstLetter(deletedUserName)}`}
              close={handleShowMakeOpModal}
              buttonText={'Atribuir permissões'}
              buttonPosition={"buttons-permissions-center"}
              makeOpText={true}
              onClickModal={handleMakeOpPopUp}
            />
          )}

          {makeOpPopUp ?
            <div className="container-confirm-popup">
              <div className="confirm-popup">
                <div className="text-popup">
                  Deseja realmente tornar este usuário um <b>Operador</b>?
                </div>
                <div className="buttons-popup">
                  <button className="cancel-button" onClick={() => {
                    setMakeOpPopUp(false)
                    setShowMakeOpModal(true)
                  }}>
                    Cancelar
                  </button>
                  <button className="addButton" id="makeop-button" onClick={handleChangeRole}>
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
            : null}

          {changePermissionsPopUp ?
            <div className="container-confirm-popup">
              <div className="confirm-popup">
                <div className="text-popup">
                  Deseja realmente salvar as alterações do <b>operador</b> <b>{capitalizeFirstLetter(deletedUserName)}</b>?
                </div>
                <div className="buttons-popup">
                  <button className="cancel-button" onClick={() => {
                    setChangePermissionsPopUp(false)
                    setShowPermissionsModal(true)
                  }}>
                    Cancelar
                  </button>
                  <button className="addButton" id="changepermissions-button" onClick={handleChangePermissions}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
            : null}

          {confirmDeletePopUp ?
            <div className="container-confirm-popup">
              <div className="confirm-popup" id="delete">
                <div className="textarea-popup">
                  <p className="deny-title">Excluir do sistema</p>
                  <div className="text-deny-popup">Deseja realmente excluir <b>{capitalizeFirstLetter(deletedUserName)}</b> do Blizzard?</div>
                </div>
                <div className="buttons-popup">
                  <button className="cancel-button" onClick={() => setConfirmDeletePopUp(false)}>
                    Cancelar
                  </button>
                  <button className="exit-button" id="deny-button" onClick={() => { handleDeleteUser(tableUserId) }}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
            : null}

          <div className="requests">
            <div className="requests-header">
              <h3 className="requests-title">Solicitações</h3>
              <h5 onClick={() => setConfirmDenyPopUp(true)} >Negar todos</h5>
            </div>
            <UserRequests></UserRequests>
          </div>

        </div>

        {confirmDenyPopUp ?
          <div className="container-confirm-popup">
            <div className="confirm-popup" id="deny-all">
              <div className="textarea-popup">
                <p className="deny-title">Negar solicitações</p>
                <div className="text-deny-popup">Deseja realmente negar todas as <b>solicitações de usuários</b>?</div>
              </div>
              <div className="buttons-popup">
                <button className="cancel-button" onClick={() => setConfirmDenyPopUp(false)}>
                  Cancelar
                </button>
                <button className="exit-button" id="deny-button" onClick={handleDenyAll}>
                  Negar
                </button>
              </div>
            </div>
          </div>
          : null}

      </div>

    </div>
  );
}
