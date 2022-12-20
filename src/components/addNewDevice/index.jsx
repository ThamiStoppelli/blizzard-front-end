import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import "./style.css";
import closeIcon from '../../Assets/close.png'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";
import { AuthContext } from '../../contexts/auth';


export const AddNewDevice = ({ onClick }) => {

  const [name, setName] = useState("");
  const [deviceNumber, setDeviceNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const { config, devices, setDevices, loading, setLoading, showModalVisibility, setShowModalVisibility, showOldModal, setShowOldModal, checkedLocations, setCheckedLocations, checkedSpaces, setCheckedSpaces } = useContext(AuthContext);

  const addDevice = async (field) => {
    
    field.preventDefault();

    const newDevice = {
      name: name,
      patrimonio: deviceNumber,
      mac: macAddress,
      category: category,
      localization: location,
      icon: 4,
    }

    setLoading(true);

    await api.post(`/devices/create`, newDevice, config).then(res => {

      setLoading(false);
      toast.success("Aparelho cadastrado com sucesso", {className:"success-toast"});
      onClick();

      api.get(`/devices/list`, config).then(response => {

        setDevices(response.data);

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
      <div className="addDeviceDiv">
        <div className="header-wrapper">
          <p>Cadastro de aparelhos</p>
          <img src={closeIcon} onClick={onClick}></img>
        </div>

        <div className="form-wrapper">
          <label>Nome de identificação</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Patrimonio</label>
          <input
            type="text"
            onChange={(event) => {
              setDeviceNumber(event.target.value);
            }}
          />

          <label>Endereço MAC</label>
          <input
            type="text"
            onChange={(event) => {
              setMacAddress(event.target.value);
            }}
          />

          <label>Categoria</label>
          <input
            type="text"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />

          <label>Localização</label>
          <input
            type="text"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />

        </div>

        <div className="buttonsDivModal">
          <button className="addButton" onClick={addDevice}>
            Cadastrar aparelho
          </button>
        </div>
      </div>
    </div>
  );
};