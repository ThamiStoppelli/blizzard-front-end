import React, { useState, useContext } from "react";

import "./style.css";
import categoryIcon from '../../assets/ac-icon.svg';
import locationIcon from '../../assets/locations.svg'
import energyIcon from '../../assets/energy.svg'
import DotsIcon from '../../assets/vertical-dots.svg';
import deleteIcon from '../../assets/trash.svg';
import deactivateIcon from '../../assets/deactivate.svg';
import editIcon from '../../assets/edit.svg'
import arrowIcon from '../../assets/arrow-schedule.svg'

import Popup from 'reactjs-popup';
import { AuthContext } from '../../contexts/auth';
import Switch from '../../components/ToggleSwitch'

function DeviceCard({
  key, name, id, location, space,
  currentConsumption,
  setDeviceId, setDeviceName,
  setConfirmDeletePopUp, confirmDeletePopUp,
}) {

  //   const [data, setData] = useState([])
  //   const [name, setName] = useState('')
  //   const [category, setCategory] = useState('')
  //   const [mac, setMac] = useState('')
  //   const [localization, setLocalization] = useState('')
  //   const [editId, setEditId] = useState('')
  //   const [modal, setModal] = useState(false);
  //   const [status, setStatus] = useState(false)
  //   const [voltage, setVoltage] = useState('')
  //   const [current, setCurrent] = useState('')
  //   const [deletedDevice, setDeletedDevice] = useState();

  //   useEffect(() => {
  //       loadData();
  //   }, [])
  //   useEffect(() => { console.log(editId) }, [editId])
  //   async function loadData() {
  //       const response = await api.get('/device/list')
  //       setData(response.data)
  //   }

  //   function showData(data) {
  //       setModal(true);
  //       setEditId(data._id)
  //       setName(data.name)
  //       setCategory(data.category)
  //       setMac(data.mac)
  //       setLocalization(data.localization)
  //       console.log(editId);
  //   }

  //   async function editData(editId) {
  //       const updatedData = {
  //           name: name,
  //           category: category,
  //           mac: mac,
  //           localization: localization
  //       };

  //       if(updatedData.name === '' || updatedData.category === '' || updatedData.mac === '' ||updatedData.localization =='') {
  //           toast.error("Preencha os campos obrigatórios para cadastrar", {className:"error-toast"});
  //       } else {

  //           await api.put(`/device/update/${editId}`, updatedData)
  //           .then(() => this.setState({ status: 'Sucessfully updated' }))
  //           .catch((err) => {
  //               console.log(err);
  //               console.log('teste');
  //               //alert("Não foi possível editar");  -> ver sobre trocar o then. para try and catch
  //           })
  //           setModal(false);
  //           loadData();
  //          // window.location.reload(true);
  //           toast.success("Dados atualizados com sucesso.", {className:"success-toast"});
  //       }
  //   }

  // function deleteData(id) {

  //   if (!window.confirm("Deseja realmente excluir este aparelho?")) return;
  //   api.delete(`/device/delete/${id}`).then(() => this.setState({ status: 'Sucessfully deleted' }));
  //   toast.success(`Aparelho ${deletedDevice} excluído`, {className:"success-toast"});

  //   window.location.reload(true);
  // }


  //   //map vai renderizar um container pra cada item no Array data
  //   data.map((data, id) => (

  //       <div>
  //           <div className="cards" key={id}>
  //               <div className="cardInfo">
  //                   <h3>Nome: {data.name} </h3>
  //                   <h3>Categoria: {data.category} </h3>
  //                   <h3>MAC: {data.mac}</h3 >
  //                   <h3>Localização: {data.localization} </h3>
  //                   <h3>Data: {moment(data.updatedAt).format('DD/MM/YYYY')} </h3>



  const [showModal, setShowModal] = useState(false);
  const [typeUser, setTypeUser] = useState();
  const { config, user, users, setUsers, userRequests, setUserRequests, setLoading, checkedLocations, setCheckedLocations, checkedSpaces, setCheckedSpaces, showMakeOpModal, setShowMakeOpModal, showPermissionsModal, setShowPermissionsModal } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  function handleDelete() {
    setShowModal(false)
    console.log(confirmDeletePopUp)
    setConfirmDeletePopUp(true)
  }

  function handleEdit() {
    setShowModal(false)
    console.log(showPermissionsModal)
    //setShowPermissionsModal(true)
  }

  function handleDeactivate() {
    setShowModal(false)
    console.log(showMakeOpModal)
    //setShowMakeOpModal(true)
  }

  function capitalizeFirstLetter(string) {
    const names = string.split(" ");
    for (let i = 0; i < names.length; i++) {
      if (names[i] === "de" || names[i] === "De" || names[i] === "do" || names[i] === "dos" || names[i] === "Do" || names[i] === "Dos" || names[i] === "da" || names[i] === "das" || names[i] === "Da" || names[i] === "Das" || names[i] === "e" || names[i] === "E") {
        names[i] = names[i][0].toLowerCase() + names[i].substr(1);
      } else {
        names[i] = names[i][0].toUpperCase() + names[i].substr(1);
      }
    }

    return names.join(" ");
  }

  return (

    <div key={key} className="devices-card">
      <div id='device-name'>
        <div className="icon-name">
          <img src={categoryIcon} className="device-icon" />
          <p className="device-title">{capitalizeFirstLetter(name)}</p>
        </div>
        <Popup
          trigger={<div className='info-dots'><img src={DotsIcon} onClick={() => {
            setDeviceId(id);
            setDeviceName(name);
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

          {showModal ?
            (
              <div className="container-modal" id="modal-device">
                <div className="modal-device">
                  <div className="modal-button" onClick={console.log(name)}>
                    <img src={editIcon}></img>
                    <h3 className="text-modal">
                      Editar aparelho
                    </h3>
                  </div>
                  <div className="modal-button" onClick={console.log(name)}>
                    <img src={deactivateIcon}></img>
                    <h3 className="text-modal">
                      Desativar aparelho
                    </h3>
                  </div>
                  <div className="modal-button" onClick={handleDelete}>
                    <img src={deleteIcon}></img>
                    <h3 className="text-modal" id="delete-user">
                      Excluir aparelho
                    </h3>
                  </div>
                </div>
              </div>
            ) : null
          }

        </Popup>
      </div>
      <div className="icon-name" id="info">
        <img src={locationIcon} className="energy-icon" />
        <p className="device-info">Bloco M/Sala M9</p>
      </div>
      <div className="icon-name" id="info">
        <img src={energyIcon} className="energy-icon" />
        <p className="device-info"> {currentConsumption} 426mA </p>
      </div>

      <div className="schedule-device">
        <p>Horário anexado</p>
        <img src={arrowIcon} />
      </div>
      <div className="status-bar" id="device-status">
        <div>
          <p className="status-title">Status:</p>
          <p>{toggle ? "Ligado" : "Desligado"}</p>
        </div>
        <Switch onChange={(event) => {
          setToggle(event.target.checked)}} />
        
      </div>
    </div>

  )
}

export default DeviceCard;