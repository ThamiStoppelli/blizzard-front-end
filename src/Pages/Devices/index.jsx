import React, { useState, useContext, useEffect } from 'react';

import "./style.css"
import addIcon from '../../assets/addIcon.png';
import NavBar from "../../components/Navbar";
import Header from '../../components/Header';
import { AddNewDevice } from '../../components/AddNewDevice';
import Alerts from '../../components/Alerts';
import DeviceCard from '../../components/DeviceCard';

import 'react-toastify/dist/ReactToastify.minimal.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

export default function Devices() {

  const [showAddDevice, setAddDevice] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const { logout, token, config, devices, setDevices } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [deviceId, setDeviceId] = useState();
  const [deviceName, setDeviceName] = useState();
  const [confirmDeletePopUp, setConfirmDeletePopUp] = useState(false);
  const [category, setCategory] = useState("-1");
  const [location, setLocation] = useState("-1");
  const [deviceStatus, setDeviceStatus] = useState("-1");

  const handleSetAddDevice = () => {
    setAddDevice(!showAddDevice);
  };

  useEffect(() => {
    api.get(`/devices/list`, config).then(response => {

      setDevices(response.data);

    }).catch(err => {
      console.log(token)

      if (err.response === undefined) {
        console.log("não existem dispositivos");

      } else {
        console.log(err.response);
        logout();
      }
    })

  }, [])

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
        <Header title="Aparelhos" />

        <div className="organizeHorizontal">
          <div className="organizeList" >

            <div className="search-area" >
              <input className="search" type="text" placeholder="Pesquise pelo nome do aparelho" onChange={(event) => {
                setSearchTerm(event.target.value);
              }} />

              <Select
                className='select-devices'
                id='select-category'
                value={category}
                sx={{
                  boxShadow: 'none',
                  borderRadius: '6px',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 }
                }}
                defaultValue="-1"
                onChange={(event) => {
                  setCategory(parseInt(event.target.value));
                }}              >
                <MenuItem className="select-menu" value="-1">Categorias</MenuItem>
                <MenuItem value="0">Iluminação</MenuItem>
                <MenuItem value="1">Ar condicionado</MenuItem>
                {/* fazer request pro back da lista de categorias, fazer um map no filtro? */}
              </Select>

              <Select
                className='select-devices'
                id='select-location'
                value={location}
                sx={{
                  boxShadow: 'none',
                  borderRadius: '6px',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 }
                }}
                defaultValue="-1"
                onChange={(event) => {
                  setLocation(parseInt(event.target.value));
                }}              >
                <MenuItem className="select-menu" value="-1">Localização</MenuItem>
                <MenuItem value="0">Bloco A</MenuItem>
                <MenuItem value="1">Bloco K</MenuItem>
                <MenuItem value="2">Bloco M</MenuItem>
                {/* fazer request pro back da lista de localizações com dropdown de espaços, fazer um map no filtro? */}
              </Select>

              <Select
                className='select-devices'
                id='select-status'
                value={deviceStatus}
                sx={{
                  boxShadow: 'none',
                  borderRadius: '6px',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 }
                }}
                defaultValue="-1"
                onChange={(event) => {
                  setDeviceStatus(parseInt(event.target.value));
                }}              >
                <MenuItem className="select-menu" value="-1">Status do aparelho</MenuItem>
                <MenuItem value="0">Ligado</MenuItem>
                <MenuItem value="1">Desligado</MenuItem>
              </Select>
            </div>

            <button onClick={handleSetAddDevice} className="addButton">
              <img src={addIcon} className="addIcon" />
              Cadastrar aparelho
            </button>

            <div className="list">
            {devices.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            }).filter((event) => {
              if (searchTerm === "") {
                return event
              } else if (replaceSpecialChars(event.name.toLowerCase()).includes(replaceSpecialChars(searchTerm.toLowerCase()))) {
                return event
              }
            }).map((device) => (
              <DeviceCard
                key={device._id}
                name={device.name}
                id={device._id}
                setDeviceId={setDeviceId}
                setDeviceName={setDeviceName}
                setConfirmDeletePopUp={setConfirmDeletePopUp}
                confirmDeletePopUp={confirmDeletePopUp}
              />
            ))}
          </div>
          </div>

          <Alerts />
        </div>
      </div>

      {showAddDevice && (
        <AddNewDevice
          onClick={handleSetAddDevice}
          createdDevice={() => {
            setShowPopUp(true);
          }}
        />
      )}

      {/* {showPopUp && (
            <div className="popUp">
              <p>Aparelho cadastrado com sucesso!</p>
            </div>
          )} */}
    </div>
    // </div>
  );
}
