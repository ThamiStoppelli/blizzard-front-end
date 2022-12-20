import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "./style.css"
import addIcon from '../../Assets/addIcon.png';
import spaceIcon from '../../Assets/spaces.svg';
import deleteIcon from '../../Assets/trash.svg'
import rightArrowIcon from '../../Assets/right-arrow.svg'
import previousCrumbtrailArrow from '../../Assets/previousCrumbtrail.svg';
import scheduleIcon from '../../Assets/clockIcon.svg'

import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/deleteModal';
import Switch from '../../components/toggleSwitch'


export default function Spaces() {

  const { logout, token, config, locations, setLocations, spaces, setSpaces, block, setBlock } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [spaceName, setSpaceName] = useState("")
  const [spaceId, setSpaceId] = useState("")
  const [toggle, setToggle] = useState(false);


  let navigate = useNavigate()

  useEffect(() => {
    api.get(`/spaces/list?name=${block}`, config).then(response => {

      console.log(response)
      setSpaces(response.data.OK);

    }).catch(err => {
      console.log(token)

      if (err.response === undefined) {
        console.log(err)
        console.log("não existem espaços");

      } else {
        console.log(err.response);
        logout();
      }
    })

  }, [])

  const handleDeleteSpaces = async (id, name) => {

    if (confirmName == spaceName) {
      await api.delete(`/spaces/delete/${id}`, config).then(res => {
        console.log(res.data);
        toast.success(`Localização ${capitalizeFirstLetter(name)} excluída`, { className: "success-toast" })
        setConfirmPopUp(false);

        api.get(`/spaces/list?name=${block}`, config).then(response => {

          console.log(response)
          setSpaces(response.data.OK);

        }).catch(err => {
          console.log(token)

          if (err.response === undefined) {
            console.log(err)
            console.log("não existem espaços");

          } else {
            console.log(err.response);
            logout();
          }
        })
      }).catch((err) => {
        toast.error("Não foi possível excluir a localização", { className: "error-toast" });
        console.log(err)
      })
    }
  };

  function activateButton() {
    if (confirmName == spaceName) {
      return false;
    } else {
      return true;
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

      <div className='crumbs-trail'>
        <a onClick={() => navigate("/grupos")}>Localizações</a>
        <img src={previousCrumbtrailArrow}></img>
        <p className='crumbs-trail-current'>{block}</p>
      </div>

      <div className='schedule'>
        <input className="schedule-search" type="text" placeholder="Pesquise pelo nome da localização" onChange={(event) => {
          setSearchTerm(event.target.value);
        }} />

        <button className="schedule-button">
          <img src={scheduleIcon} className="addIcon" />
          Horário de funcionamento
        </button>
      </div>


      <button className="addButton">
        <img src={addIcon} className="addIcon" />
        Cadastrar localização
      </button>

      <div className="list">
        {spaces.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }).filter((event) => {
          if (searchTerm == "") {
            return event
          } else if (replaceSpecialChars(event.name.toLowerCase()).includes(replaceSpecialChars(searchTerm.toLowerCase()))) {
            return event
          }
        }).map((space) => (
          <div className="card-spaces">
            <div className="card-title">
              <div>
                <img src={spaceIcon} className="icon"></img>
                <p className="card-name">{capitalizeFirstLetter(space.name)}</p>
              </div>
              <img src={deleteIcon} className="delete-icon" onClick={() => {
                setConfirmPopUp(true)
                setSpaceName(capitalizeFirstLetter(space.name))
                setSpaceId(space._id)
              }}></img>
            </div>
            <div className="devices-amount" id="spaces">
              {/* location.deviceAmount -> pegar a quantidade de dispositivos por localização do back? */}
              <p className="devices-amount-number">100</p>
              <p className="devices-amount-total">/100</p>
              <p className="devices-amount-text">Aparelhos ligados</p>
            </div>

            <div className="status-bar" id="device-status">
              <div>
                <p className="status-title">Status:</p>
                <p>{toggle ? "Ligado" : "Desligado"}</p>
                {/* pegar status do back? criar logica no front? */}
              </div>
              <Switch onChange={(event) => setToggle(event.target.checked)} />

            </div>
          </div>
        ))
        }

        {confirmPopUp ?
          <DeleteModal
            title={'Espaço'}
            name={capitalizeFirstLetter(spaceName)}
            onChange={(event) => {
              setConfirmName(event.target.value);
            }}
            type={'nesse espaço'}
            cancelButton={() => setConfirmPopUp(false)}
            onClick={() => handleDeleteSpaces(spaceId, spaceName)}
            freezeButton={activateButton()}
          />
          : null}

      </div>
    </div>
  );
}
