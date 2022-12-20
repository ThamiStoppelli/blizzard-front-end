import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import addIcon from '../../assets/addIcon.png';
import locationIcon from '../../assets/locations.svg';
import deleteIcon from '../../assets/trash.svg'
import rightArrowIcon from '../../assets/right-arrow.svg'
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import DeleteModal from '../DeleteModal';

import "./style.css"

export default function Locations() {

  const { logout, token, config, locations, setLocations, block, setBlock } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [locationName, setLocationName] = useState("")
  const [locationId, setLocationId] = useState("")
  
  let navigate = useNavigate()

  useEffect(() => {
    api.get(`/blocks/list/`, config).then(response => {
      setLocations(response.data);

    }).catch(err => {
      console.log(token)

      if (err.response === undefined) {
        console.log("não existem localizações");

      } else {
        console.log(err.response);
        logout();
      }
    })
  }, [block])

  const handleDeleteLocations = async (id, name) => {

    if (confirmName === locationName) {
      await api.delete(`/blocks/delete/${id}`, config).then(res => {
        console.log(res.data);
        toast.success(`Localização ${capitalizeFirstLetter(name)} excluída`, { className: "success-toast" })
        setConfirmPopUp(false);
  
        api.get(`/blocks/list/`, config).then(response => {
  
          setLocations(response.data);
  
        }).catch(err => {
          console.log(token)
  
          if (err.response === undefined) {
            console.log("não existem localizações");
  
          } else {
            console.log(err.response);
            logout();
          }
        })
      }).catch((err) => {
        toast.error("Não foi possível excluir a localização", { className: "error-toast" });
        console.log(err)
      })}
  };

  function activateButton() {
    if (confirmName === locationName) {
      return false;
    } else {
      return true;
    }
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

  function replaceSpecialChars(string) {
    string = string.replace(/[àáâãä]/, "a");
    string = string.replace(/[èéêë]/, "e");
    string = string.replace(/[ìíî]/, "i");
    string = string.replace(/[òóôõö]/, "o");
    string = string.replace(/[ç]/, "c");

    return string.replace(/[^a-z0-9]/gi, '');
  }

  return (
    <div>

      <input className="search" type="text" placeholder="Pesquise pelo nome da localização" onChange={(event) => {
        setSearchTerm(event.target.value);
      }} />

      <button className="addButton">
        <img src={addIcon} className="addIcon" />
        Cadastrar localização
      </button>

      <div className="list">
        {locations.sort(function(a, b) {
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
        }).map((location) => (
          <div className="card">
            <div className="card-title">
              <div>
                <img src={locationIcon} className="icon"></img>
                <p className="card-name">{capitalizeFirstLetter(location.name)}</p>
              </div>
              <img src={deleteIcon} className="delete-icon" onClick={() => {
                setConfirmPopUp(true) 
                setLocationName(capitalizeFirstLetter(location.name))
                setLocationId(location._id)
              }}></img>
            </div>
            <div className="devices-amount">
              {/* location.deviceAmount -> ver como pegar a quantidade de dispositivos por localização (filtro no back?) */}
              <div>
                <p className="devices-amount-number">100</p>
                <p className="devices-amount-total">/100</p>
                <p className="devices-amount-text">Aparelhos ligados</p>
              </div>
              <p className="devices-percentage">Percentual: 100%</p>
            </div>

            <div className="spaces-button" onClick={() => {
              setBlock(location.name);
              navigate("/grupos/espacos");
            }}>
              <p>Espaços</p>
              <img src={rightArrowIcon}></img>
            </div>

          </div>
        ))
        }

        {confirmPopUp ?
          <DeleteModal 
          title={'Localização'}
          name={capitalizeFirstLetter(locationName)}
          onChange={(event) => {
            setConfirmName(event.target.value);
          }}
          type={'nesse local'}
          cancelButton={() => setConfirmPopUp(false)}
          onClick={() => handleDeleteLocations(locationId, locationName)}
          freezeButton={activateButton()}
          />
        : null}

      </div>
    </div>
  );
}
