import React, { useContext, useState, useEffect } from "react";

import closeIcon from '../../assets/close.png'
import api from "../../services/api";
import { AuthContext } from '../../contexts/auth';

import CheckboxInput from "../CheckboxInput";

import "./style.css";
import 'react-toastify/dist/ReactToastify.css';

export const VisibilityPermissions = ({
  title, buttonText, buttonPosition,
  showGoBackButton, setShowGoBackButton,
  makeOpText, open, close, onClickModal

}) => {

  const { config, locations, setLocations, setShowModalVisibility, setShowOldModal, checkedLocations, setCheckedLocations } = useContext(AuthContext);

  //const [locationCheckboxValue, setLocationCheckboxValue] = useState(false)
  // const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const list = [];

  useEffect(() => {
    api.get(`/blocks/list/`, config).then(response => {

      setLocations(response.data);
      console.log(response.data)

    }).catch(err => {
      console.log(err)

      if (err.response === undefined) {
        console.log("não existem localizações");

      } else {
        console.log(err.response);
      }
    })
    
  }, [])

  useEffect(() => {
    handleCheckAll();
  }, [])

  // function handleVisibilityPermissions() {
  //   //setCheckedLocations(auxCheckedLocations); nao funciona
  //   // toast.success("Locais atribuídos", { className: "success-toast" });
  //   console.log(checkedSpaces);
  //   //onClickModal;
  // }

  function handleCheckAll() {

    if (isCheckAll) {
      setIsCheckAll(false);
      setCheckedLocations([]);

    } else { 
      setIsCheckAll(true);
      for(let i = 0; i < locations.length; i++) {
        list.push(locations[i]._id)
      }
      setCheckedLocations(list);
      
      document.getElementById('select-all').onclick = function() {
        var checkboxes = document.getElementsByClassName('checkblocks');
        for (var checkbox of checkboxes) {
            checkbox.checked = this.checked;
        }
      }
    }
    console.log(isCheckAll)
    console.log(checkedLocations)
  }

  function dynamicSort(event) {
    var sortOrder = 1;

    if (event[0] === "-") {
      sortOrder = -1;
      event = event.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
        return b[event].localeCompare(a[event]);
      } else {
        return a[event].localeCompare(b[event]);
      }
    }
  }

  //fazer função para atribuir blocos

  return (
    <div className="background">
      <div className="permissions-card">
        <div className="header-wrapper-accept">
          <div>
            <span>{title}</span>
            <img src={closeIcon} className="close-icon" onClick={
              //setShowGoBackButton(true)
              close
            }></img>
          </div>
          <a>Atribuir permissões de visualização para o usuário</a>
        </div>

        <p className="permissions-message">
        
        {makeOpText ?
          <p className="makeop-message">Para tornar este usuário operador, selecione os locais de visualização disponíveis abaixo.</p>
          : null
        }

        Este usuário ficará responsável pelo acompanhamento e manutenção dos aparelhos referentes aos locais que forem atribuídos a ele.
        
        </p>

        <div className="locations-select">
          <input 
          type="checkbox" 
          id="select-all" 
          name="select-all" 
          value={isCheckAll} 
          onClick={() => handleCheckAll() } />
          <label for="select-all">Visualizar todos os blocos</label>
        </div>

        <div className="scroll-area">
          {locations.sort(dynamicSort('name')).map((location) => (
            
            <CheckboxInput 
            locationId={location._id}
            locationName={location.name}
            />
          
          ))}
        </div>

        <div className={buttonPosition}>
          {showGoBackButton ?
            <button className="goback-button" onClick={() => {
              setShowModalVisibility(false)
              setShowOldModal(true)
            }}>
              Voltar
            </button>
            : null
          }
          <button className="addButton" onClick={onClickModal}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};